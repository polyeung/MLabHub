from rest_framework import serializers
from lab.models import Lab

class LabSerializer(serializers.ModelSerializer):
    isSaved = serializers.SerializerMethodField()
    class Meta:
        model = Lab
        fields = ['id', 'name', 'link', 'intro', 'people', 'funding', 'dep', 'approved', 'isSaved']

    def get_isSaved(self, obj):
        user_id = self.context['request'].user.id
        saved_labs = self.context.get('saved_labs', set())
        if user_id:
            return int(obj.id) in saved_labs
        else:
            return False

class CreateLabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = ['name', 'link', 'intro', 'people', 'funding', 'dep', 'emails', 'creator_id']

class SimpleLabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = ['id', 'name', 'link', 'dep']