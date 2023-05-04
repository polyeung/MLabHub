"""MLabHub package initializer."""
import flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy 
from flask_session import Session 
from dotenv import load_dotenv


# Load variables from .env file
load_dotenv()
# app is a single object used by all the code modules in this package
app = flask.Flask(__name__)  # pylint: disable=invalid-name
app.config.from_object('MLabHub.config')
sess_db = SQLAlchemy(app)
app.config['SESSION_SQLALCHEMY'] = sess_db
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
# TODO: change this session cookie domain to sub domain
app.config['SESSION_COOKIE_DOMAIN'] = 'localhost'
sess = Session(app)
CORS(app, supports_credentials=True)



import MLabHub.api  # noqa: E402  pylint: disable=wrong-import-position
#import insta485.views  # noqa: E402  pylint: disable=wrong-import-position
import MLabHub.db_model  # noqa: E402  pylint: disable=wrong-import-position
import MLabHub.account # noqa: E402  pylint: disable=wrong-import-position