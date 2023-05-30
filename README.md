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

# frontend development guideline

# backend development guideline

The backend is coded in Python 3.10. The backend is using django and django rest framework. Every django function should have one app. 

Current app includes:
1. account
    subtitle 1. 
2. lab related
    subtitle 1.
3. job related
    subtitle 1.

