from django.urls import path, include
from .views import SignupView, GetCSRFToken

urlpatterns = [
    path('create', SignupView.as_view()),
    path('csrf_cookie', GetCSRFToken.as_view()),
]