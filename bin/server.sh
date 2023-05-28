#!/bin/bash
set -Eeuo pipefail

# activate the virtual environment
source env/bin/activate

# run the backend
cd MLabHubdjango

python3 manage.py runserver