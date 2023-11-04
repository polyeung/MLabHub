from django.db import models
from django.contrib.postgres.fields import ArrayField
from lab.models import Lab
from oidc_auth.models import User
from django.utils import timezone

class JobData(models.Model):
    CREDIT = 'credit'
    NUMBER = 'number'
    VOLUNTEER = 'volunteer'
    FLEXIBLE = 'flexible'
    RATE_CHOICES = (
        (CREDIT, 'Credit'),
        (NUMBER, 'Number'),
        (VOLUNTEER, 'Volunteer'),
        (FLEXIBLE, 'Flexible'),
    )

    WORK_HOURS_CHOICES = (
        ('< 10 hours', '< 10 hours'),
        ('10-20 hours', '10-20 hours'),
        ('20-30 hours', '20-30 hours'),
        ('> 30 hours', '> 30 hours'),
        ('flexible', 'Flexible'),
    )

    WORK_MODEL_CHOICES = (
        ('Onsite', 'Onsite'),
        ('Remote', 'Remote'),
        ('Hybrid', 'Hybrid'),
        ('Unsure', 'Unsure'),
    )

    CONSECUTIVE_SEMESTERS_CHOICES = (
        ('A semester', 'A semester'),
        ('Two semesters', 'Two semesters'),
        ('Academic year', 'Academic year'),
        ('Summer', 'Summer'),
    )
    id = models.AutoField(primary_key=True)
    labid = models.ForeignKey(Lab, on_delete=models.CASCADE, db_column='labid')
    title = models.CharField(max_length=100)
    course = ArrayField(models.CharField(max_length=100))
    rate_type = models.CharField(max_length=10, choices=RATE_CHOICES, default=NUMBER)
    rate = models.FloatField(null=True, blank=True)
    contact = models.EmailField()
    intro = models.TextField()
    labname = models.CharField(max_length=100)
    lablink = models.URLField()
    workhoursselection = models.CharField(max_length=20, choices=WORK_HOURS_CHOICES)
    workmodel = models.CharField(max_length=20, choices=WORK_MODEL_CHOICES)
    consecutivesemestersselect = models.CharField(max_length=20, choices=CONSECUTIVE_SEMESTERS_CHOICES)
    create_date = models.DateTimeField(default=timezone.now)
    approved = models.BooleanField(default=False)
    creator_id = models.CharField(max_length=20)
    def __str__(self):
        return self.title
