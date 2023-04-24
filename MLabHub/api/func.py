"""REST API for posts."""
import sys
import flask
from flask import jsonify
import MLabHub

@MLabHub.app.route('/')
def get_default():
    return "Hi! Checkout /getLabInfo"

@MLabHub.app.route('/getLabInfo')
def get_labInfo():
    connection = MLabHub.model.get_db()
    cur = connection.execute("SELECT * FROM labs")
    retList = []
    for row in cur:
        retList.append(row)
    return retList
