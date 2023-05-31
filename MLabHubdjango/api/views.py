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
from django.db.models import Q
import pprint
import json
