# api/urls.py
from django.urls import path, include
from . import views

urlpatterns = [
    path('getLabInfo', views.GetLabInfo.as_view()),
    path('getLabInfo/<int:id>', views.GetDetailedLabInfo.as_view()),
    path('getComments/<int:id>', views.GetComments.as_view()),
    path('addComments/<int:labid>', views.AddComments.as_view()),
    path('deleteComments/<int:labid>', views.DeleteComments.as_view()),
    path('account/', include('account.urls')),
]
