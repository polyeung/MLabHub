from django.shortcuts import render
from django.http import JsonResponse, Http404
from django.views import View
from django.contrib.auth.models import User
from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import generics, permissions, status
import pprint
import json
from lab.models import Lab
from .serializers import LabSerializer
from django.db.models import Q

from .serializers import CreateLabSerializer
from django.contrib.auth.models import User

class GetLabInfo(APIView):
    permission_classes = (permissions.AllowAny, )
    def get(self, request):
        # only retrieve lab info that has been approved
        labs = Lab.objects.filter(~Q(approved=False))
        labs = LabSerializer(labs, many = True)
        return Response(labs.data)
    

class GetDetailedLabInfo(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny, )
    def get(self, request, id):
        try:
            lab = Lab.objects.get(pk=id)
        except Lab.DoesNotExist:
            return JsonResponse({"error": "Lab not found"}, status=404)
        lab_data = {
            "id": lab.id,
            "name": lab.name,
            "link": lab.link,
            "intro": lab.intro,
            "people": lab.people,
        }
        
        return JsonResponse(lab_data, safe = False)


@method_decorator(csrf_exempt, name = 'dispatch')
class CreateLabInfo(APIView):
    def post(self, request):
        try:
            IsAuthenticated = User.is_authenticated
            if IsAuthenticated:
                # comes from session and get user object
                user = request.user
                data = self.request.data
                Lab.objects.create(
                    name=data['name'],
                    link=data['link'],
                    intro=data['intro'],
                    people=data['people'],
                    funding=data['funding'],
                    dep=data['dep'],
                    approved=False,
                    emails=data['emails'],
                    creator_id=user.id
                )
                return Response({'success': True}, status = status.HTTP_200_OK)
        except:
            return Response({'error':"Something went wrong when checking authentication status"})
