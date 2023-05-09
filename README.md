# MLabHub

Uses a React frontend and Flask server.

## Setup

Install NPM dependencies and set up the Python virtual environment:

```
./bin/install.sh
```

## Build frontend

Build into the dist folder:

```
npm run build
```

Build and watch (development):

```
./bin/frontend.sh
```

## Run the server

The Flask server serves the frontend content and also runs the REST API.

```
./bin/server.sh
```
