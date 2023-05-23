from django.shortcuts import render
from django.http import JsonResponse, Http404
from django.views import View
from django.contrib.auth.models import User
from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from MLabHub.db_model import get_pg_db
from rest_framework.response import Response
from rest_framework import generics, permissions, status
from .models import JobData
from .serializers import JobDataSerializer
import pprint
import json


class GetJobInfo(APIView):
    permission_classes = (permissions.AllowAny, )
    def get(self, request):
        try:
            jobs = JobData.objects.all()
            jobs = JobDataSerializer(jobs, many=True)
            return Response(jobs.data, status = status.HTTP_200_OK)
        except:
            return Response({'error':'Something went wrong when get Job Info'}, status=status.HTTP_400_BAD_REQUEST)


class PostNewJob(APIView):
    def post(self,request):
        try:
            IsAuthenticated = User.is_authenticated

            if IsAuthenticated:
                # comes from session and get user object
                user = request.user
                username = user.username
                # TODO: select name and created from another tables:
                userprofile = UserProfile.objects.get(user=user)
                return Response({
                                 'username': username,
                                 'name': userprofile.name,
                                 'email': userprofile.email,
                                 'created': userprofile.created.strftime('%Y-%m-%d')}, status = status.HTTP_200_OK)
            else:
                return Response({'error': 'authenticate failed'}, status = status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'error':'Something went wrong when creating a new job'}, status=status.HTTP_400_BAD_REQUEST)