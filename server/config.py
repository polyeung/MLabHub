"""Insta485 development configuration."""
import pathlib
import redis
import os
# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/'
# Secret key for encrypting cookies
SECRET_KEY = os.urandom(24)
SESSION_COOKIE_NAME = "login"
# File Upload to var/uploads/
MLABHUB_ROOT = pathlib.Path(__file__).resolve().parent.parent
UPLOAD_FOLDER = MLABHUB_ROOT/'var'/'uploads'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
MAX_CONTENT_LENGTH = 16 * 1024 * 1024
# Database file is var/insta485.sqlite3
DATABASE_FILENAME = MLABHUB_ROOT/'var'/'LabHub.sqlite3'
SECRET_KEY = 'super-secret-key'

