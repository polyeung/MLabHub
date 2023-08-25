from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.contrib import auth
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect, csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from .serializers import UserSerializer
from .models import UserProfile
import pprint
from datetime import datetime
from django.urls import reverse
from django.http import HttpResponse, JsonResponse, HttpResponseForbidden, HttpResponseBadRequest
from django.core.serializers import serialize
import json
from django.shortcuts import get_object_or_404
from lab.models import Lab
from jobpage.models import JobData
from lab.serializers import SimpleLabSerializer
from django.db.models import Q
from jobpage.serializers import SimpleJobSerializer

@method_decorator(csrf_exempt, name = 'dispatch')
class CheckAuthenticatedView(APIView):
    def get(self, request, format = None):

        try:
            IsAuthenticated = request.user.is_authenticated
            if IsAuthenticated:
                # comes from session and get user object
                user = request.user
                # TODO: select name and created from another tables:
                #userprofile = UserProfile.objects.get(user=user)
                return Response({'username': user.username,
                                 'name': user.first_name + " " + user.last_name,
                                 'email': user.email,
                                 'created': "NA"
                                 }, status = status.HTTP_200_OK)
            else:
                return Response({'isAuthenticated': 'error'}, status = status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'error':"Something went wrong when checking authentication status"}, status = status.HTTP_400_BAD_REQUEST)



"""
@method_decorator(csrf_protect, name = 'dispatch')
class UpdateView(APIView):
"""

@method_decorator(csrf_protect, name = 'dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self, request, format = None):
        data = self.request.data
        username = data['username']
        password = data['password']
        #pprint.pprint(username)
        #pprint.pprint(password)
        try:
            user = auth.authenticate(username = username, password = password)
            if user is not None:
                auth.login(request, user)
                return Response({"success":"User authenticated", 'username':username}, status = status.HTTP_200_OK)
            else:
                return Response({'error': 'Error Authenticating'}, status = status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'error': 'Something went wrong when logging in'})


@method_decorator(csrf_protect, name = 'dispatch')
class LogoutView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self, request, format = None):
        try:
            auth.logout(request)
            print(request.data)
            return Response({'success':'Logged out'}, status = status.HTTP_200_OK)
        except:
            return Response({'error': "Something went wrong when logging out"}, status = status.HTTP_400_BAD_REQUEST)

def get_logout_url(request):
     logout_url = reverse('oidc_logout')
     return JsonResponse({'logout_url': logout_url})

class DeleteAccountView(APIView):
    def delete(self, request, format = None):
        user = self.request.user
        try:
            user = User.objects.filter(id = user.id).delete
            return Response({'success':'User deleted successfully'})
        except:
            return Response({'error':'Something went wrong when trying to delete user'})


#If already authenticated, rest_frame work will help us do csrf protecting
@method_decorator(ensure_csrf_cookie, name = 'dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def get(self, request, format = None):
        return Response({'success': 'CSRF Cookie set'}, status = status.HTTP_200_OK)


class GetUsersView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format = None):
        users = User.objects.all()
        users = UserSerializer(users, many=True)
        return Response(users.data)

# below are user profile settings
# get what labs that user saved
class GetSavedLabsView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        data = serialize('json',UserProfile.objects.filter(uid=request.user.id))

        parsed_data = json.loads(data)
        ret_data = []
        if len(parsed_data) > 0:
            ret_data = parsed_data[0]['fields']['data']['savedLabs']
        labs = Lab.objects.filter(Q(approved=True) & Q(id__in=ret_data))
        serialized_labs = SimpleLabSerializer(labs, many=True).data
        return JsonResponse(serialized_labs, safe=False)


@method_decorator(csrf_protect, name = 'dispatch')
class UpdateSavedLabsView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self, request, format = None):
        # check whether login
        if not User.is_authenticated:
            return HttpResponseForbidden({"error": "Please login to saved this lab"})
        saved_labs_json = self.get_saved_labs(request.user.id)
        saved_labs = saved_labs_json["saved_labs"]
        row_exist = saved_labs_json["is_exist"]
        print("saved_labs_json", saved_labs_json)
        data = self.request.data
        lab_id =  int(data.get('lab_id', -1))
        print("lab_id", lab_id)
        if lab_id == -1:
            return HttpResponseBadRequest({"error": "lab_id not provided"})
        if not row_exist:
            # case 1: row not exist, must be save this lab
            try:
                UserProfile.object.create(
                    uid = request.user.id,
                    data = {
                        "savedLabs": [lab_id]
                    }
                )
                return Response({'success': True}, status = status.HTTP_200_OK)
            except:
                return HttpResponseBadRequest({'error':"Something went wrong"})
        else:
            # row is already exist
            if lab_id in saved_labs:
                # case 2: already exist delete that lab, unsave it
                saved_labs.remove(lab_id)
            else:
                # case 3: add labs
                saved_labs.append(lab_id)
            # update the saved_labs in database
            try:
                user_profile = get_object_or_404(UserProfile, uid=request.user.id)
                user_profile.data["savedLabs"] = saved_labs
                user_profile.save()
            except:
                return HttpResponseBadRequest({'error':"Something went wrong "})
        return Response({'success':"Successfully saved lab!"})
    
    def get_saved_labs(self, uid):
        print("user id: ", uid)
        if uid is None:
            return []
        row_not_exist = False
        data = serialize('json',UserProfile.objects.filter(uid=uid))
        if data != "":
            row_not_exist = True
        parsed_data = json.loads(data)
        ret_data = []
        if len(parsed_data) > 0:
            ret_data = parsed_data[0]['fields']['data']['savedLabs']

        return {"saved_labs": ret_data, "is_exist": row_not_exist}


# # Update and get Jobs info starts from here.......
class GetSavedJobsView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        data = serialize('json',UserProfile.objects.filter(uid=request.user.id))

        parsed_data = json.loads(data)
        ret_data = []
        if len(parsed_data) > 0:
            ret_data = parsed_data[0]['fields']['data']['savedJobs']
        jobs = JobData.objects.filter(Q(approved=True) & Q(id__in=ret_data))
        serialized_jobs = SimpleJobSerializer(jobs, many=True).data
        return JsonResponse(serialized_labs, safe=False)


@method_decorator(csrf_protect, name = 'dispatch')
class UpdateSavedJobsView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self, request, format = None):
        # check whether login
        if not User.is_authenticated:
            return HttpResponseForbidden({"error": "Please login to saved this lab"})
        saved_labs_json = self.get_saved_labs(request.user.id)
        saved_labs = saved_labs_json["saved_labs"]
        row_exist = saved_labs_json["is_exist"]
        print("saved_labs_json", saved_labs_json)
        data = self.request.data
        lab_id =  int(data.get('lab_id', -1))
        print("lab_id", lab_id)
        if lab_id == -1:
            return HttpResponseBadRequest({"error": "lab_id not provided"})
        if not row_exist:
            # case 1: row not exist, must be save this lab
            try:
                UserProfile.object.create(
                    uid = request.user.id,
                    data = {
                        "savedLabs": [lab_id]
                    }
                )
                return Response({'success': True}, status = status.HTTP_200_OK)
            except:
                return HttpResponseBadRequest({'error':"Something went wrong"})
        else:
            # row is already exist
            if lab_id in saved_labs:
                # case 2: already exist delete that lab, unsave it
                saved_labs.remove(lab_id)
            else:
                # case 3: add labs
                saved_labs.append(lab_id)
            # update the saved_labs in database
            try:
                user_profile = get_object_or_404(UserProfile, uid=request.user.id)
                user_profile.data["savedLabs"] = saved_labs
                user_profile.save()
            except:
                return HttpResponseBadRequest({'error':"Something went wrong "})
        return Response({'success':"Successfully saved lab!"})
    
    def get_saved_labs(self, uid):
        print("user id: ", uid)
        if uid is None:
            return []
        row_not_exist = False
        data = serialize('json',UserProfile.objects.filter(uid=uid))
        if data != "":
            row_not_exist = True
        parsed_data = json.loads(data)
        ret_data = []
        if len(parsed_data) > 0:
            ret_data = parsed_data[0]['fields']['data']['savedLabs']

        return {"saved_labs": ret_data, "is_exist": row_not_exist}