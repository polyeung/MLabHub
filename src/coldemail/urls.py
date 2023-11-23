# api/urls.py
from django.urls import path
from .views import StreamQueryResponseView

urlpatterns = [
    path('stream-query/', StreamQueryResponseView.as_view(), name='stream-query'),
]