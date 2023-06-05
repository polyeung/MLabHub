from django.urls import path, re_path
from .views import IndexView, TemplateView

app_name = 'mlabhub_template'
urlpatterns = [
    path('', IndexView.as_view(), name='home'),
]
