#!/bin/bash
set -Eeuo pipefail

# set nginx config
# the default file in Amazon Linux is /etc/nginx/nginx.conf
PARENT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
NGINX_PATH="/etc/nginx/nginx.conf"
cat "$PARENT_PATH/nginx.conf" | sudo tee $NGINX_PATH > /dev/null
sudo systemctl restart nginx

# build frontend
npm i
npm run build

# install backend dependencies
source ./env/bin/activate
pip install -r requirements.txt

# restart gunicorn on port 5000
pkill -f gunicorn || true
gunicorn -b localhost:8000 -w 2 -D MLabHub:app
