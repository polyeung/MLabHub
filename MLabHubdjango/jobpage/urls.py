from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path('getJobInfo', views.GetJobInfo.as_view()),
]