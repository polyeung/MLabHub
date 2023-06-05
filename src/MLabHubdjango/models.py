from django.db import models
from django.contrib.sessions.models import Session

class Lab(models.Model):
    name = models.CharField(max_length=100)
    link = models.CharField(max_length=200)
    intro = models.CharField(max_length=400)
    people = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.name


class Comment(models.Model):
    lab = models.ForeignKey(Lab, on_delete=models.CASCADE)
    rating = models.IntegerField()
    name = models.CharField(max_length=20)
    word = models.CharField(max_length=300)

    def __str__(self):
        return f"{self.name}: {self.word}"


class User(models.Model):
    username = models.CharField(max_length=20, unique=True, blank=True, null=True)
    password = models.CharField(max_length=256, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.username or self.email

# You can use Django's built-in session model:
# from django.contrib.sessions.models import Session
# Or, if you want to customize the session model, you can create your own class like this:

class CustomSession(Session):
    data = models.BinaryField()

    class Meta:
        unique_together = ('session_key',)
        db_table = 'sessions'
        verbose_name = 'session'
        verbose_name_plural = 'sessions'

    def __str__(self):
        return self.session_key
