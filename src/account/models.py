from django.db import models
from django.conf import settings
from lab.models import Lab



class SavedLabs(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    lab = models.ForeignKey(Lab, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)


