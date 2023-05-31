# api/urls.py
from django.urls import path, include
from . import views

urlpatterns = [
    path('getLabInfo', views.GetLabInfo.as_view()),
    path('getLabInfo/<int:id>', views.GetDetailedLabInfo.as_view()),
]
