from django.db import models
from django.contrib.sessions.models import Session
from django.utils import timezone

class Lab(models.Model):
    name = models.CharField(max_length=100)
    link = models.CharField(max_length=200)
    intro = models.TextField()
    people = models.CharField(max_length=200, blank=True)
    funding = models.CharField(max_length=20, default="NA")
    dep = models.CharField(max_length=20, default="NA")
    approved = models.BooleanField(default=False)
    emails = models.CharField(max_length=200)
    creator_id = models.IntegerField()
    create_date = models.DateTimeField(default=timezone.now)
    # Match this class to table "labs"
    class Meta:
        db_table = 'labs'
    
    def __str__(self):
        return self.name

