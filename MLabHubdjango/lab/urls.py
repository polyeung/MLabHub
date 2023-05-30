# api/urls.py
from django.urls import path, include
from . import views

urlpatterns = [
    path('create', views.CreateLabInfo.as_view()),
]
