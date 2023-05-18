from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views
urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('api.urls')),
    path('', views.index, name='index')
]

#urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name = 'index.html'))]
