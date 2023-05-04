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