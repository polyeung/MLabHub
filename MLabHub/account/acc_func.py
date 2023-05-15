import sys
import flask
import bcrypt
from flask import jsonify
import MLabHub
from MLabHub.db_model import get_pg_db


@MLabHub.app.route('/api/account/', methods=['GET'])
def handle_account():
    logname = flask.session.get('logname')
    if logname is not None:
        # TODO: check error here
        conn = get_pg_db()
        cur = conn.execute(
            """SELECT username, name, email, created FROM users 
            WHERE username = %(logname)s""",{'logname':logname})
        user = cur.fetchone()

        if user is None:
            flask.session.clear()
            return flask.jsonify({'error': 'Invalid session.'}), 401

        return flask.jsonify(user)
    else:
        return flask.jsonify({'error': 'Not logged in.'}), 401

@MLabHub.app.route('/api/account/update/', methods=['POST'])
def handle_account_update():
     # Abort if already logged in
    # Get request body
    body = flask.request.json
    if body is None:
        flask.abort(400)
    name = body.get('name')
    email = body.get('email')
    username = body.get('username')
    conn = get_pg_db()
    try:
        cur = conn.execute(
            """UPDATE users SET email = %(email)s, name = %(name)s WHERE username = %(username)s""",
            {
                'name':name,
                'email':email,
                'username': username
            }
        )
        conn.commit()
    except Exception as e:
        return flask.jsonify({'error': f'Failed to update account, {e}'}), 500
    
    return flask.jsonify({'success': True}), 200



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
        print(username, hash)
        conn = get_pg_db()
        conn.execute("INSERT INTO users (username, password) VALUES (%(username)s, %(password)s)", 
        {'username': username, 'password': hash})
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
    conn = get_pg_db()
    cur = conn.execute(
        "SELECT username, password FROM users "
        "WHERE username = %s",
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


@MLabHub.app.route('/api/account/delete/', methods=['POST'])
def handle_delete_account():
    # Check if user is logged in
    logname = flask.session.get('logname')
    if logname is None:
        return flask.jsonify({'error': 'Not logged in.'}), 401
    # check confirm password correctness
    body = flask.request.json
    if body is None:
        flask.abort(400)
    conn = get_pg_db()
    password = body.get('password')

    if password is None:
         flask.abort(400)

    cur = conn.execute(
        "SELECT username, password FROM users "
        "WHERE username = %s",
        (logname, )
    )
    user = cur.fetchone()

    # Make sure user exists
    if user is None:
        return flask.jsonify({'error': 'User does not exist.'}), 404

    # Check if password is correct
    if not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return flask.jsonify({'error': 'Incorrect password.'}), 401
    # try to delete it
    try:
        conn.execute(
            """
            DELETE FROM users
            WHERE username = %(logname)s;
            """,{'logname': logname})
        conn.commit()
        # clear session
        flask.session.clear()
    except Exception as e:
        return flask.jsonify({'error': f'Failed to update account, {e}'}), 500
    return flask.jsonify({'success': True}), 200