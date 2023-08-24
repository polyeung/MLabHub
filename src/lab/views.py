from django.shortcuts import render
from django.http import JsonResponse, Http404, HttpResponseBadRequest
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
from .serializers import LabSerializer, LabSerializerLabPage
from django.db.models import Q
from account.models import UserProfile
from .serializers import CreateLabSerializer
from django.contrib.auth.models import User
from django.core.serializers import serialize
from django.core.paginator import Paginator
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from lab.util import school_to_dep


class CustomPagination(PageNumberPagination):
    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'total_page': self.page.paginator.num_pages,
            'previous': self.get_previous_link(),
            'next': self.get_next_link(),
            'labs': data,
        })


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

# using restframework pagination
class LabViewSet(viewsets.ReadOnlyModelViewSet):
    pagination_class = CustomPagination
    serializer_class = LabSerializer
    authentication_classes = []
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = None
        school = self.request.query_params.get('school')
        search = self.request.query_params.get('search')
        school_list = school_to_dep(school)
        queryset = Lab.objects.filter(approved=True)
        if school and school_list:
            queryset = queryset.filter(dep__in=school_list)
        if search:
            queryset = queryset.filter(Q(name__icontains=search) | 
                                       Q(people__icontains=search) |
                                       Q(dep__icontains=search))
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        if self.request.user.id:
            context['saved_labs'] = self.get_saved_labs(self.request.user.id)
        else:
            context['saved_labs'] = []
        return context

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


class GetDetailedLabInfo(viewsets.ReadOnlyModelViewSet):
    permission_classes = (permissions.AllowAny, )
    serializer_class = LabSerializerLabPage
    pagination_class = None
    def get_queryset(self):
        id = self.request.query_params.get('id')
        return Lab.objects.filter(pk=id)

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
            return HttpResponseBadRequest({'error':"Something went wrong when checking authentication status"})

