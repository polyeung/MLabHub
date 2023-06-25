from rest_framework import serializers
from .models import JobData

class JobDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobData
        exclude = ('oidc_auth_user', )
