from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from api.models import Lab

class JobData(models.Model):
    CREDIT = 'credit'
    NUMBER = 'number'
    RATE_CHOICES = (
        (CREDIT, 'Credit'),
        (NUMBER, 'Number'),
    )

    labid = models.ForeignKey(Lab, on_delete=models.CASCADE, db_column='labid')
    title = models.CharField(max_length=100)
    course = ArrayField(models.CharField(max_length=100))
    rate_type = models.CharField(max_length=10, choices=RATE_CHOICES, default=NUMBER)
    rate = models.FloatField(null=True, blank=True)
    contact = models.EmailField()
    intro = models.TextField()
    labname = models.CharField(max_length=100) 
    lablink = models.URLField()

    def __str__(self):
        return self.title



