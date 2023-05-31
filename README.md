# Development guide

## step 1: install dependencies


### MLabHub

Uses a React frontend and Flask server.

### Setup

Install NPM dependencies and set up the Python virtual environment:

```
./bin/install.sh
```

### Build frontend

Build into the dist folder:

```
npm run build
```

Build and watch (development):

```
./bin/frontend.sh
```

### Run the server

The Flask server serves the frontend content and also runs the REST API.

```
./bin/server.sh
```





# Project Structure
## frontend development guideline


## backend development guideline
The Django backend consists of multiple apps, each serving a specific purpose. Here is an overview of the project structure:

- project_name
  ├── app1
  │   ├── __init__.py
  │   ├── models.py
  │   ├── serializers.py
  │   ├── urls.py
  │   └── views.py
  ├── app2
  │   ├── __init__.py
  │   ├── models.py
  │   ├── serializers.py
  │   ├── urls.py
  │   └── views.py
  ├── app3
  │   ├── __init__.py
  │   ├── models.py
  │   ├── serializers.py
  │   ├── urls.py
  │   └── views.py
  ├── app4
  │   ├── __init__.py
  │   ├── models.py
  │   ├── serializers.py
  │   ├── urls.py
  │   └── views.py
  ├── app5
  │   ├── __init__.py
  │   ├── models.py
  │   ├── serializers.py
  │   ├── urls.py
  │   └── views.py
  ├── app6
  │   ├── __init__.py
  │   ├── models.py
  │   ├── serializers.py
  │   ├── urls.py
  │   └── views.py
  ├── project_name
  │   ├── __init__.py
  │   ├── settings.py
  │   ├── urls.py
  │   └── wsgi.py
  ├── manage.py
  └── requirements.txt
