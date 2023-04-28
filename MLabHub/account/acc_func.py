import sys
import flask
import bcrypt
from flask import jsonify
import MLabHub
@MLabHub.app.route('/api/account/', methods=['GET'])
def handle_account():
    return "account page!"

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
    is_experimenter = body.get('isExperimenter')
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
        conn = MLabHub.model.get_db()
        cur = conn.execute(
            """
            INSERT INTO users (username, password)
            VALUES (%(username)s, %(password)s)
            """,
            {
                'username': username,
                'password': hash
            }
        )
    except:
        return flask.jsonify({'error': 'Account with name already exists.'}), 409

    # Update user session
    flask.session['logname'] = username
    return '', 200
