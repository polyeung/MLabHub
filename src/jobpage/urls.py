from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path('getJobInfo', views.GetJobInfo.as_view()),
    path('jobCreate', views.PostNewJob.as_view()),
    path('getPostedJobs', views.GetPostedJobs.as_view()),
    path('deletejob/<int:job_id>', views.delete_job.as_view()),
]