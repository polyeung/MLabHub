from django.db import models
from django.contrib.sessions.models import Session
from lab.models import Lab

class Comment(models.Model):
    labid = models.ForeignKey(Lab, on_delete=models.CASCADE, db_column='labid')
    rating = models.IntegerField()
    name = models.CharField(max_length=20)
    word = models.CharField(max_length=300)

    class Meta:
        db_table = 'comments'

    def __str__(self):
        return f"{self.name}: {self.word}"



