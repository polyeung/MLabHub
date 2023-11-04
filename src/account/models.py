from django.db import models
from django.conf import settings
from lab.models import Lab
from django.contrib.postgres.fields import JSONField
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserProfile(models.Model):
    id = models.AutoField(primary_key=True)
    uid = models.IntegerField()
    data = JSONField(default=dict(savedLabs=[], savedJobs=[]))
    # data 
    # {
    #    savedLabs: ["lab_id1", "lab_id2", "lab_id3"],
    #    savedJobs: ["job_id1", "job_id2", "job_id3"]
    # }
    def __str__(self):
        return str(self.id)

# when new user added in oidc_auth_user, create row automatically
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(uid=instance.id)

post_save.connect(create_user_profile, sender=settings.AUTH_USER_MODEL)