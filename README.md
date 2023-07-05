# Development guide

### MLabHub

Uses a React frontend and Django server.

### Development build
### Setup1

Docker setup (please download Docker desktop)

1. Get credentials for env file and rename .env.example to .env and put credentials in
2. Build docker image

```
docker-compose -f docker-compose.dev.yml build
```

3. Run docker image

```
docker-compose -f docker-compose.dev.yml up
```

4. Stop without removing containers

```
docker-compose -f docker-compose.dev.yml stop
```

5. Stop and remove containers

```
docker-compose -f docker-compose.dev.yml down
```

### Setup2

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
source env/bin/activate
cd MLabHubdjango
python3 manage.py runserver
```

### Production build


Docker setup (please download Docker desktop)

1. Get credentials for env file and rename .env.example to .env and put credentials in
2. Build docker image

```
docker-compose  build
```

3. Run docker image

```
docker-compose  up
```

4. Stop without removing containers

```
docker-compose  stop
```

5. Stop and remove containers

```
docker-compose  down
```
# Project Structure

## frontend development guideline

## Backend Development Guideline

### urls.py

- This file defines the URL patterns for your Django project. It includes the following URLs:
  - `/api-auth/`: URL for including authentication-related URLs provided by the Django Rest Framework.
  - `/api/`: URL for including the URLs defined in the api.urls module.
  - `/`: URL for the index view.
  - `/admin/`: URL for accessing the Django administration site.

### account/urls.py

- This file defines the URL patterns for the account app. It includes the following URLs:
  - `/create`: URL for the SignupView to handle user signup.
  - `/csrf_cookie`: URL for the GetCSRFToken to retrieve the CSRF token.
  - `/is_login`: URL for the CheckAuthenticatedView to check if the user is authenticated.
  - `/logout`: URL for the LogoutView to handle user logout.
  - `/login`: URL for the LoginView to handle user login.
  - `/delete`: URL for the DeleteAccountView to handle user account deletion.
  - `/get_users`: URL for the GetUsersView to retrieve a list of all users.
  - `/user`: URL for the GetUserProfileView to retrieve the user's profile.
  - `/update`: URL for the UpdateUserProfileView to update the user's profile.

### account/views.py

- This file contains the view classes that handle the logic for different API endpoints in the account app:
  - `CheckAuthenticatedView`: View class that checks if the user is authenticated and returns user details if authenticated.
  - `SignupView`: View class that handles user signup by creating a new user account.
  - `UpdateView`: (Incomplete) View class that is currently commented out.
  - `LoginView`: View class that handles user login by authenticating the credentials.
  - `LogoutView`: View class that handles user logout.
  - `DeleteAccountView`: View class that handles user account deletion.
  - `GetCSRFToken`: View class that retrieves the CSRF token for the client.
  - `GetUsersView`: View class that retrieves a list of all users.
  - `GetUserProfileView`: View class that retrieves the profile of the authenticated user.
  - `UpdateUserProfileView`: View class that updates the profile of the authenticated user.

### comment/urls.py

- This file defines the URL patterns for the comment-related functionality in the project. It includes the following URLs:
  - `getComments/<int:id>`: URL for retrieving comments for a specific lab identified by id.
  - `addComments/<int:labid>`: URL for adding comments to a specific lab identified by labid.
  - `deleteComments/<int:labid>`: URL for deleting comments from a specific lab identified by labid.

### comment/views.py

- This file contains the view classes that handle the logic for the comment-related functionality:
  - `GetComments`: View class that handles the HTTP GET request to retrieve comments for a specific lab. It queries the Comment model for comments associated with the given labid and returns the comments as a JSON response.
  - `AddComments`: View class that handles the HTTP POST request to add comments to a specific lab. It checks if the user is authenticated, retrieves the comment data from the request, creates a new Comment object, and saves it to the database. It returns a success response if the comment is created successfully or an error response if any issues occur.
  - `DeleteComments`: View class that handles the HTTP POST request to delete comments from a specific lab. It checks if the user is authenticated, retrieves the comments associated with the given labid and the authenticated user's name, and deletes the comments. It returns a success response if the comments are deleted successfully or an error response if any issues occur.

### jobpage/urls.py

- This file defines the URL patterns for the job page functionality in your Django project. It includes the following URLs:
  - `getJobInfo`: URL for retrieving job information.
  - `jobCreate`: URL for creating a new job.

### jobpage/views.py

- This file contains the view classes that handle the logic for the job page functionality:
  - `GetJobInfo`: View class that handles the HTTP GET request to retrieve job information. It queries the JobData model to fetch all jobs and serializes the data using the JobDataSerializer. It returns the serialized job data as a response.
  - `PostNewJob`: View class that handles the HTTP POST request to create a new job. It checks if the user is authenticated, retrieves the job data from the request, creates a new JobData object, and saves it to the database. It returns a success response if the job is created successfully or an error response if any issues occur.

### lab/urls.py

- This file defines the URL patterns for the lab page functionality in your Django project. It includes the following URLs:
  - `getLabInfo`: URL for retrieving general lab information.
  - `getLabInfo/<int:id>`: URL for retrieving detailed information about a specific lab.

### lab/views.py

- This file contains the view classes that handle the logic for the lab page functionality:
  - `GetLabInfo`: View class that handles the HTTP GET request to retrieve general lab information. It queries the Lab model to fetch all labs that have been approved and serializes the data using the LabSerializer. It returns the serialized lab data as a response.
  - `GetDetailedLabInfo`: View class that handles the HTTP GET request to retrieve detailed information about a specific lab. It retrieves the lab with the given id from the Lab model and constructs a dictionary with the relevant lab data. It returns the lab data as a JSON response.
