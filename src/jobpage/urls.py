from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views
from rest_framework.routers import DefaultRouter
router = DefaultRouter()

router.register(r'getJobInfo', views.JobViewSet, basename='get job info for jobpage')
urlpatterns = [
    path('jobCreate', views.PostNewJob.as_view()),
    path('getPostedJobs', views.GetPostedJobs.as_view()),
    path('deletejob/<int:job_id>', views.delete_job.as_view()),
    path('', include(router.urls)),
]