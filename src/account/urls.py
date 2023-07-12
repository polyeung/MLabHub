from django.urls import path, include
from .views import  GetCSRFToken, CheckAuthenticatedView, LoginView, LogoutView, GetUsersView
from .views import get_logout_url, GetSavedLabsView

urlpatterns = [
    path('csrf_cookie', GetCSRFToken.as_view()),
    path('is_login', CheckAuthenticatedView.as_view()),
    path('logout', get_logout_url, name='get_logout_url'),
    path('login',LoginView.as_view()),
    path('get_users', GetUsersView.as_view()),
    path('get_saved_labs', GetSavedLabsView.as_view(), name='get saved labs for specific user'),
]