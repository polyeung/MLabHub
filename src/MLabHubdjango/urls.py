from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views
from django.contrib import admin

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('api.urls')),
    path('', include('oidc_auth.urls')),
    path('admin/', admin.site.urls),
    path('', include('mlabhub_template.urls'))
]

#urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name = 'index.html'))]
