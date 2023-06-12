from django.urls import path, include
from . import views


urlpatterns = [
    path('getComments/<int:id>', views.GetComments.as_view()),
    path('addComments/<int:labid>', views.AddComments.as_view()),
    path('deleteComments/<int:labid>', views.DeleteComments.as_view()),
]