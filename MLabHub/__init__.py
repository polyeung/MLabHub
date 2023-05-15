"""MLabHub package initializer."""
import flask
from flask_socketio import SocketIO
from dotenv import load_dotenv


# Load variables from .env file
load_dotenv()
# app is a single object used by all the code modules in this package
app = flask.Flask(__name__, static_folder='../dist')  # pylint: disable=invalid-name
app.config['SECRET_KEY'] = '01/24/2023'
socketio = SocketIO(app, cors_allowed_origins="*")


import MLabHub.api  # noqa: E402  pylint: disable=wrong-import-position
#import insta485.views  # noqa: E402  pylint: disable=wrong-import-position
import MLabHub.db_model  # noqa: E402  pylint: disable=wrong-import-position
import MLabHub.account # noqa: E402  pylint: disable=wrong-import-position
import MLabHub.routes