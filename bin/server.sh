#!/bin/bash
set -Eeuo pipefail

# activate the virtual environment
source env/bin/activate

# run the backend
python3 server