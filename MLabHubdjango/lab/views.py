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
import pprint
import json
from api.models import Lab
from .serializers import LabSerializer

class GetLabInfo(APIView):
    permission_classes = (permissions.AllowAny, )
    def get(self, request):
        labs = Lab.objects.all()
        labs = LabSerializer(labs, many = True)
        return Response(labs.data)
    