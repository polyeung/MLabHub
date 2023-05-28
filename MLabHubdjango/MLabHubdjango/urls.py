from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views
from django.contrib import admin

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('api.urls')),
    path('lab/', include('lab.urls')),
    path('', views.index, name='index'),
    path('admin/', admin.site.urls)
]

#urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name = 'index.html'))]
