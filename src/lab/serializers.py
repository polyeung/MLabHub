from rest_framework import serializers
from lab.models import Lab

class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = ['id', 'name', 'link', 'intro', 'people', 'funding', 'dep', 'approved']

class CreateLabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = ['name', 'link', 'intro', 'people', 'funding', 'dep', 'emails', 'creator_id']

class SimpleLabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = ['id', 'name', 'link', 'dep']