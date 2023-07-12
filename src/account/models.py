from django.db import models
from django.conf import settings
from lab.models import Lab
from django.contrib.postgres.fields import JSONField


class UserProfile(models.Model):
    id = models.AutoField(primary_key=True)
    uid = models.IntegerField()
    data = JSONField()
    # data 
    # {
    #    savedLabs: ["lab_id1", "lab_id2", "lab_id3"]
    # }
    def __str__(self):
        return str(self.id)


