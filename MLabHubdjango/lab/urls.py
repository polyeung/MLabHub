# api/urls.py
from django.urls import path, include
from . import views

urlpatterns = [
    path('test', views.GetLabInfo.as_view()),
]
