from rest_framework import serializers
from api.models import Lab

class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = ['id', 'name', 'link', 'intro', 'people', 'funding', 'dep', 'approved']

class CreateLabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = ['name', 'link', 'intro', 'people', 'funding', 'dep', 'emails']
