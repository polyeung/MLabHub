from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'getLabInfo2', views.LabViewSet, basename='get lab info for overview page')

urlpatterns = [
    path('getLabInfo', views.GetLabInfo.as_view()),
    path('getLabInfo/<int:id>', views.GetDetailedLabInfo.as_view()),
    path('create', views.CreateLabInfo.as_view()),
    path('', include(router.urls)), # This line includes the URL patterns defined by the router
]
