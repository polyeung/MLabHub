from rest_framework import serializers
from .models import JobData

class JobDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobData
        fields = '__all__'

class SimpleJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobData
        fields = ['id', 'title', 'labname']