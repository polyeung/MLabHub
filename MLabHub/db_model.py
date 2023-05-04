"""MLabHub model (database) API."""
import sqlite3
import flask
import MLabHub
import os
import psycopg
from psycopg.rows import dict_row

# here is the db modal for sqlite
def dict_factory(cursor, row):
    """Go Function Decoration."""
    return {col[0]: row[idx] for idx, col in enumerate(cursor.description)}


def get_db():
    """Go Function Decoration."""
    if 'sqlite_db' not in flask.g:
        db_filename = MLabHub.app.config['DATABASE_FILENAME']
        flask.g.sqlite_db = sqlite3.connect(str(db_filename))
        flask.g.sqlite_db.row_factory = dict_factory
        # Foreign keys have to be enabled per-connection.  This is an sqlite3
        # backwards compatibility thing.
        flask.g.sqlite_db.execute("PRAGMA foreign_keys = ON")
    return flask.g.sqlite_db


@MLabHub.app.teardown_appcontext
def close_db(error):
    """Go Function Decoration."""
    assert error or not error  # Needed to avoid superfluous style error
    sqlite_db = flask.g.pop('sqlite_db', None)
    if sqlite_db is not None:
        sqlite_db.commit()
        sqlite_db.close()

# here is the db modal for postgress

def get_pg_db():
    if 'db' not in flask.g:
        flask.g.db = psycopg.connect(
            host=os.getenv('DB_HOST'),
            port=os.getenv('DB_PORT'),
            dbname=os.getenv('DB_NAME'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASS')
        )
        flask.g.db.row_factory = dict_row

    return flask.g.db


@MLabHub.app.teardown_appcontext
def close_pg_db(exception):
    db = flask.g.pop('db', None)
    if db is not None:
        db.commit()
        db.close()

