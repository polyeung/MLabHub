#!/bin/bash
# insta485run
# Stop on errors
# See https://vaneyckt.io/posts/safer_bash_scripts_with_set_euxo_pipefail/
set -Eeuo pipefail

if test ! -e var/LabHub.sqlite3; then
    echo "Creating database"
fi

# Set FLASK_ENV and FLASK_APP environment variables
export FLASK_ENV=development
FLASK_ENV=development
export FLASK_APP=MLabHub
FLASK_APP=MLabHub

# Run the development server on port 8000
flask run --host 0.0.0.0 --port 8000