# api/urls.py
from django.urls import path, include
from . import views

urlpatterns = [
    path('lab/', include('lab.urls')),
    path('comment/', include('comment.urls')),
    path('account/', include('account.urls')),
    path('jobpages/', include('jobpage.urls')),
    path('coldemail/', include('coldemail.urls')),
]
