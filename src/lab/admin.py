from django.contrib import admin
from lab.models import Lab
from lab.models import Pic, Label
# Register your models here.
admin.site.register(Lab)
admin.site.register(Pic)
admin.site.register(Label)
