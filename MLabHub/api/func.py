"""REST API for posts."""
import sys
import flask
from flask import jsonify
import MLabHub
from MLabHub.db_model import get_pg_db

@MLabHub.app.route('/')
def get_default():
    """Feed content for default page."""
    return "Hi! Checkout /getLabInfo "

@MLabHub.app.route('/getLabInfo')
def get_labInfo():
    """Feed content for brief overview page."""
    connection = get_pg_db()
    # TODO: fetch first 10
    cur = connection.execute("""SELECT * FROM labs""")
    return cur.fetchall()

@MLabHub.app.route('/getLabInfo/<id>')
def get_detailedLabInfo(id):
    """Feed content for each detailed lab page."""
    connection = get_pg_db()
    # add more detailed select for more rich content
    cur = connection.execute(
        """
        SELECT * FROM labs WHERE id = %(id)s
        """, {'id': id}).fetchone()
    return cur

@MLabHub.app.route('/getComments/<id>')
def get_comments(id):
    """Feed content for each detailed lab page."""
    connection = get_pg_db()
    # add more detailed select for more rich content
    cur = connection.execute(
        """
        SELECT id,rating,name,word FROM comments WHERE labid = %(id)s
        """, {'id': id}).fetchall()
    return cur

@MLabHub.app.route('/addComments/<labid>', methods=['POST'])
def add_comments(labid):
    """Feed content for each detailed lab page."""
    # check whether login?
    logname = flask.session.get('logname')
    if logname is None:
        return flask.jsonify({'error': 'Please login to comment'}), 401
    body = flask.request.json
    if body is None:
        return flask.jsonify({'error': 'No body json'}), 401
    name = body.get('name')
    rating = body.get('rating')
    word = body.get('word')

    if (name is None) or (labid is None):
        return flask.jsonify({'error': 'name/labid cannot be null'}), 401
    if (rating is None) or (word is None):
        return flask.json({'error': 'word/rating cannot be null'}), 401

    connection = get_pg_db()
    # check wether comments exist
    cur = connection.execute(
        """SELECT id FROM comments
            WHERE name = %(name)s
        """,{'name': logname}).fetchall()

    if cur:
        return flask.jsonify({'error': 'Already comment! Please Remove comment first.'}), 401

    # add more detailed select for more rich content
    try:
        cur = connection.execute(
            """
            INSERT INTO comments(labid,rating,name,word)
            VALUES (%(labid)s, %(rating)s, %(name)s, %(word)s)
            """, {
                'labid': labid,
                'rating': rating,
                'name': name,
                'word': word
                })
        connection.commit()
    except Exception as e:
        return flask.jsonify({'error': f'Failed to insert comment, {e}'}), 500
    return flask.jsonify({'success': True}), 200

@MLabHub.app.route('/deleteComments/<labid>', methods=['POST'])
def delete_comments(labid):
    logname = flask.session.get('logname')
    if logname is None:
        return flask.jsonify({'error': 'Please login to comment'}), 401
    connection = get_pg_db()
    # check wether comments exist
    cur = connection.execute(
        """SELECT id FROM comments
            WHERE name = %(name)s
        """,{'name': logname}).fetchall()

    if not cur:
        return flask.jsonify({'error': 'No comments yet!'}), 401
    try:
       cur = connection.execute(
        """
        DELETE FROM comments
        WHERE name = %(name)s
        """, {
            'name': logname
        })
    except Exception as e:
        return flask.jsonify({'error': f'Failed to delete comment, {e}'}), 500
    return flask.jsonify({'success': True}), 200