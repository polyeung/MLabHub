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
from account.models import UserProfile
from .serializers import CreateLabSerializer
from django.contrib.auth.models import User
from django.core.serializers import serialize
from django.core.paginator import Paginator

class GetLabInfo(APIView):
    permission_classes = (permissions.AllowAny, )
    def get(self, request):
        # get page for pagination
        page = int(request.GET.get('page', 1))
        # only retrieve lab info that has been approved
        labs = Lab.objects.filter(~Q(approved=False))
        p = Paginator(labs, 9)
        labs_serialized = LabSerializer(p.page(page), many=True).data
        # get saved labs info
        saved_labs = self.get_saved_labs(request.user.id)
        # make saved_labs as a set for quick search
        saved_labs_set = set(saved_labs)
        # interage throuth labs.data
        # mark isSaved to true when user saved it
        for item in labs_serialized:
            item['isSaved'] = (int(item['id']) in saved_labs_set)
        
        response_data = {
            'total_page': p.num_pages,
            'labs': labs_serialized
        }
        return Response(response_data)
    
    def get_saved_labs(self, uid):
        print("user id: ", uid)
        if uid is None:
            return []
        data = serialize('json',UserProfile.objects.filter(uid=uid))
        parsed_data = json.loads(data)
        ret_data = []
        if len(parsed_data) > 0:
            ret_data = parsed_data[0]['fields']['data']['savedLabs']
        return ret_data

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
