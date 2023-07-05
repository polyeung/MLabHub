from django.urls import path, re_path
from .views import IndexView, TemplateView

app_name = 'mlabhub_template'
urlpatterns = [
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]