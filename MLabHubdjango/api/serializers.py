from rest_framework import serializers
from .models import Lab

class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = ['id', 'name', 'link', 'intro', 'people','funding', 'dep', 'approved']
