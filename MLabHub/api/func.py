"""REST API for posts."""
import sys
import flask
from flask import jsonify
import MLabHub



@MLabHub.app.route('/')
def get_default():
    connection = MLabHub.model.get_db()
    cur = connection.execute("SELECT * FROM labs")
    for row in cur:
        print(row)
    return "hello world"
