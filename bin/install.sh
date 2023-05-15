#!/bin/bash
set -Eeuo pipefail

# set up the virtual environment
python3 -m venv env
source env/bin/activate

# install the requirements
pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
pip install -e .

# install the frontend
npm install
