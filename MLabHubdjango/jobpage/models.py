from django.db import models
from django.contrib.auth.models import User
from api.models import Lab

class JobData(models.Model):
    labid = models.ForeignKey(Lab, on_delete=models.CASCADE, db_column='labid')
    title = models.CharField(max_length = 100)
    course = models.CharField(max_length=100)
    rate = models.IntegerField()
    contact = models.EmailField()
    intro = models.TextField()
    labname = models.CharField(max_length=100) 

    def __str__(self):
        self.title


