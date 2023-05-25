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
                data = self.request.data
                try:
                    rating = data['rating']
                    name = data['name']
                    word = data['word']
                    if Comment.objects.filter(labid=labid, name=name).exists():
                        return Response({'error': 'Please delete your comment first!'}, status=status.HTTP_403_FORBIDDEN)
                    print("reach here")
                    Comment.objects.create(
                        labid_id=labid, 
                        rating=rating, 
                        name=name,
                        word=word
                    )
                    return Response({'success': True}, status = status.HTTP_200_OK)
                except:
                    return Response({'error':'Something went wrong when create comment'}, status=status.HTTP_400_BAD_REQUEST)

                
            else:
                return Response({'error': 'Please login to comment'}, status = status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'error':'Something went wrong when creating a new job'}, status=status.HTTP_400_BAD_REQUEST)