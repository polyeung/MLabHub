from rest_framework import serializers
from .models import JobData

class JobDataSerializer(serializers.ModelSerializer):
    isSaved = serializers.SerializerMethodField()
    class Meta:
        model = JobData
        fields = ['labid', 'title', 'course', 'rate_type', 'rate', 'contact',
                  'intro', 'labname', 'lablink', 'workhoursselection', 'workmodel',
                  'consecutivesemestersselect', 'approved', 'isSaved','id']

    def get_isSaved(self, obj):
        user_id = self.context['request'].user.id
        if not user_id:
            return False
        saved_jobs = self.context.get('saved_jobs', set())
        return int(obj.id) in saved_jobs

class SimpleJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobData
        fields = ['id', 'title', 'labname']