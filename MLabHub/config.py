"""Insta485 development configuration."""
import pathlib
import os
# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/'

# File Upload to var/uploads/
MLABHUB_ROOT = pathlib.Path(__file__).resolve().parent.parent
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
MAX_CONTENT_LENGTH = 16 * 1024 * 1024

# set up session postgress db 
SESSION_TYPE = 'sqlalchemy'
SQLALCHEMY_DATABASE_URI = "postgresql://" + os.getenv('DB_USER') + ":" + os.getenv('DB_PASS') + "@" + os.getenv('DB_HOST') + "/" + os.getenv('DB_NAME')
# Secret key for encrypting cookies
SECRET_KEY = b'FIXME SET WITH: $ python3 -c "import os; print(os.urandom(24))"'
SESSION_COOKIE_NAME = 'MLabHub_cookie'