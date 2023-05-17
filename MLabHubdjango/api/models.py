from django.db import models
from django.contrib.sessions.models import Session

class Lab(models.Model):
    name = models.CharField(max_length=100)
    link = models.CharField(max_length=200)
    intro = models.CharField(max_length=400)
    people = models.CharField(max_length=200, blank=True)
    # Match this class to table "labs"
    class Meta:
        db_table = 'labs'
    
    def __str__(self):
        return self.name


class Comment(models.Model):
    labid = models.ForeignKey(Lab, on_delete=models.CASCADE, db_column='labid')
    rating = models.IntegerField()
    name = models.CharField(max_length=20)
    word = models.CharField(max_length=300)

    class Meta:
        db_table = 'comments'

    def __str__(self):
        return f"{self.name}: {self.word}"



