"""MLabHub package initializer."""
import flask
from flask_cors import CORS
from flask_socketio import SocketIO
from redis import Redis
from flask_session import Session
from dotenv import load_dotenv
load_dotenv()
#from flask.ext.session import Session
# app is a single object used by all the code modules in this package
app = flask.Flask(__name__)  # pylint: disable=invalid-name
app.config.from_object('MLabHub.config')
app.config['SECRET_KEY'] = '01/24/2023'
socketio = SocketIO(app, cors_allowed_origins="*")
# server_session = Session(app)
socketio.run(app, port=5000)
#print(app.session_cookie_name)
print(flask.__version__)
# Read settings from config module (insta485/config.py)

# Overlay settings read from a Python file whose path is set in the environment
# variable INSTA485_SETTINGS. Setting this environment variable is optional.
# Docs: http://flask.pocoo.org/docs/latest/config/
#
# EXAMPLE:
# $ export INSTA485_SETTINGS=secret_key_config.py
# app.config.from_envvar('INSTA485_SETTINGS', silent=True)
# Tell our app about views and model.  This is dangerously close to a
# circular import, which is naughty, but Flask was designed that way.
# (Reference http://flask.pocoo.org/docs/patterns/packages/)  We're
# going to tell pylint and pycodestyle to ignore this coding style violation.
import server.api  # noqa: E402  pylint: disable=wrong-import-position
#import insta485.views  # noqa: E402  pylint: disable=wrong-import-position
import server.model  # noqa: E402  pylint: disable=wrong-import-position
import server.account # noqa: E402  pylint: disable=wrong-import-position