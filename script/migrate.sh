#!/bin/bash
docker-compose -f docker-compose.dev.yml exec api python manage.py makemigrations
docker-compose -f docker-compose.dev.yml exec api python manage.py migrate