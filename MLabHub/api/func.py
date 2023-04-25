"""REST API for posts."""
import sys
import flask
from flask import jsonify
import MLabHub

@MLabHub.app.route('/')
def get_default():
    """Feed content for default page."""
    return "Hi! Checkout /getLabInfo"

@MLabHub.app.route('/getLabInfo')
def get_labInfo():
    """Feed content for brief overview page."""
    connection = MLabHub.model.get_db()
    cur = connection.execute("SELECT * FROM labs")
    retList = []
    for row in cur:
        retList.append(row)
    return retList

@MLabHub.app.route('/getLabInfo/<id>')
def get_detailedLabInfo(id):
    """Feed content for each detailed lab page."""
    connection = MLabHub.model.get_db()
    # add more detailed select for more rich content
    cur = connection.execute("SELECT * FROM labs WHERE id = ?", (id,)).fetchone()
    return cur