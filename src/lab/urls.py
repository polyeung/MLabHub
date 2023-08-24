from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'getLabInfo2', views.LabViewSet, basename='get lab info for overview page')
router.register(r'getLabInfoRich', views.GetDetailedLabInfo, basename='get lab info for labpage')

urlpatterns = [
    path('getLabInfo', views.GetLabInfo.as_view()),
    # path('getLabInfo/<int:id>', views.GetDetailedLabInfo.as_view()),
    # path('getLabInfoRich', views.GetDetailedLabInfo.as_view(), name='lab-detail'),
    path('create', views.CreateLabInfo.as_view()),
    path('', include(router.urls)), # This line includes the URL patterns defined by the router
]
