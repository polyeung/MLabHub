from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.contrib import auth
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from .serializers import UserSerializer, UserProfileSerializer
from .models import UserProfile, UserProfile
import pprint

@method_decorator(csrf_protect, name = 'dispatch')
class CheckAuthenticatedView(APIView):
    def get(self, request, format = None):

        try:
            IsAuthenticated = User.is_authenticated

            if IsAuthenticated:
                return Response({'isAuthenticated': 'success'}, status = status.HTTP_200_OK)
            else:
                return Response({'isAuthenticated': 'error'}, status = status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'error':"Something went wrong when checking authentication status"})


@method_decorator(csrf_protect, name = 'dispatch')
class SignupView(APIView):
    # Since in the setting, I set all api request will need to be authenticated, but sign up and overview should not be authenticated
    permission_classes = (permissions.AllowAny, )
    
    def post(self, request, format = None):
        data = self.request.data
        username = data['username']
        password = data['password']
        name = data['name']
        email = data['email']
        try:
            if User.objects.filter(username = username).exists():
                return Response({'error': 'Account with name already exists.'}, status = status.HTTP_409_CONFLICT)
            else:
                if len(password) < 8:
                    return Response({'error': 'Password is too short'}, status = status.HTTP_400_BAD_REQUEST)
                else:
                    user = User.objects.create_user(username = username, password = password)
                    user.save()
                    user = User.objects.get(id = user.id)
                    user_profile = UserProfile(user = user, name = name, email = email)
                    user_profile.save()
                    return Response({'success': "User created successfully"}, status = status.HTTP_200_OK)
        except:
            return Response({'error':'Something went wrong when registering account'})

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



class LogoutView(APIView):
    def post(self, request, format = None):
        try:
            auth.logout(request)
            return Response({'success':'Logged out'}, status = status.HTTP_200_OK)
        except:
            return Response({'error': "Something went wrong when logging out"}, status = status.HTTP_400_BAD_REQUEST)

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


class GetUserProfileView(APIView):
    def get(self, request, format = None):
        try:
            user = self.request.user
            username = user.username
            user = User.objects.get(id = user.id)
            user_profile = UserProfile.objects.get(user = user)
            user_profile = UserProfileSerializer(user_profile)
            return Response({'profile': user_profile.data, 'username':str(user.username)})
        except:
            return Response({'error':'Something went wrong when retrieving profile'})

class UpdateUserProfileView(APIView):
    def put(self, request, format = None):
        try:
            user = self.request.user
            username = user.username
            data = self.request.data
            new_email = data['email']
            new_name = data['name']

            user = User.objects.get(id = user.id)
            UserProfile.objects.filter(user = user).update(email = new_email, name = new_name)
            user_profile = UserProfile.objects.get(user = user)
            user_profile = UserProfileSerializer(user_profile)
            return Response({'profile': user_profile.data, 'username':str(user.username)})
        except:
            return Response({'error':'Something went wrong when updating profile'})