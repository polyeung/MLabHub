import sys
import flask
import bcrypt
from flask import jsonify
import MLabHub
from MLabHub.model import get_db

@MLabHub.app.route('/api/account/test/<name>', methods=['GET'])
def test1(name):
    flask.session['logname'] = name
    return f"session set to {name}"
@MLabHub.app.route('/api/account/test/clear', methods=['GET'])
def test3():
    flask.session.clear()
    return f"session cleared!"

@MLabHub.app.route('/api/account/test/', methods=['GET'])
def test2():
    logname = flask.session.get('logname')
    return f"session is {logname}"

@MLabHub.app.route('/api/account/', methods=['GET'])
def handle_account():
    logname = flask.session.get('logname')
    if logname is not None:
        # TODO: check error here
        conn = get_db()
        cur = conn.execute(
            "SELECT username FROM users "
            "WHERE username = ?",(logname, ))
        user = cur.fetchone()

        if user is None:
            flask.session.clear()
            return flask.jsonify({'error': 'Invalid session.'}), 401

        return flask.jsonify(user)
    else:
        return flask.jsonify({'error': 'Not logged in.'}), 401

@MLabHub.app.route('/api/account/create/', methods=['POST'])
def handle_get_account():
    """Handle account creation request."""
    print("create!")
    # Abort if already logged in
    logname = flask.session.get('logname')
    if logname is not None:
        return flask.jsonify({'error': 'Already logged in.'}), 409
    # Get request body
    body = flask.request.json
    if body is None:
        flask.abort(400)
    username = body.get('username')
    password = body.get('password')
    if username is None or password is None:
        flask.abort(400)

    # Validate parameters
    if len(username) < 1 or len(username) > 20 or len(password) < 1:
        flask.abort(400)

    # Encode password with random salt
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

    # Insert account into database
    try:
        conn = get_db()
        cur = conn.execute("INSERT INTO users (username, password)"
                           "VALUES (?, ?) ", (username, hash))
        conn.commit()
    except:
        return flask.jsonify({'error': 'Account with name already exists.'}), 409

    # Update user session
    flask.session['logname'] = username
    return '', 200

@MLabHub.app.route('/api/account/login/', methods=['POST'])
def handle_login():
    """Handle user login request."""

    # Abort if already logged in
    logname = flask.session.get('logname')
    if logname is not None:
        return flask.jsonify({'error': 'Already logged in.'}), 409

    # Get request body
    body = flask.request.json
    if body is None:
        flask.abort(400)
    username = body.get('username')
    password = body.get('password')
    if username is None or password is None:
        flask.abort(400)

    # Query user from database
    conn = get_db()
    cur = conn.execute(
        "SELECT username, password FROM users "
        "WHERE username = ?",
        (username, )
    )
    user = cur.fetchone()

    # Make sure user exists
    if user is None:
        return flask.jsonify({'error': 'User does not exist.'}), 404

    # Check if password is correct
    if not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return flask.jsonify({'error': 'Incorrect password.'}), 401

    # Update user session
    flask.session['logname'] = user['username']
    print("login success!")
    return '', 200

@MLabHub.app.route('/api/account/logout/', methods=['POST'])
def handle_logout():
    """Handle logout request."""

    # Check if user is logged in
    logname = flask.session.get('logname')
    print("logname is: ", logname)
    if logname is None:
        return flask.jsonify({'error': 'Not logged in.'}), 401

    # Reset session
    flask.session.clear()
    return '', 200
