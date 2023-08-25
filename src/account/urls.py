from django.urls import path, include
from .views import  GetCSRFToken, CheckAuthenticatedView, LoginView, LogoutView, GetUsersView
from .views import get_logout_url, GetSavedLabsView, UpdateSavedLabsView
from .views import GetSavedJobsView, UpdateSavedJobsView
urlpatterns = [
    path('csrf_cookie', GetCSRFToken.as_view()),
    path('is_login', CheckAuthenticatedView.as_view()),
    path('logout', get_logout_url, name='get_logout_url'),
    path('login',LoginView.as_view()),
    path('get_users', GetUsersView.as_view()),
    path('get_saved_labs', GetSavedLabsView.as_view(), name='get saved labs for specific user'),
    path('update_saved_labs', UpdateSavedLabsView.as_view(), name='update saved labs for specific user'),
    path('get_saved_jobs', GetSavedJobsView.as_view(), name='get saved jobs for user'),
    path('update_saved_jobs', UpdateSavedJobsView.as_view(), name='update saved jobs for specific user'),
]