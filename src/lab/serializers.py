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
        if not saved_labs:
            # Fetch saved labs once and store them in the context to avoid repeated database queries
            saved_labs = get_saved_labs(user_id)
            self.context['saved_labs'] = set(saved_labs)
        return int(obj.id) in saved_labs

class CreateLabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = ['name', 'link', 'intro', 'people', 'funding', 'dep', 'emails', 'creator_id']

class SimpleLabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = ['id', 'name', 'link', 'dep']