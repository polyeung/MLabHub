from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import UserProfile
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User

@method_decorator(csrf_protect, name = 'dispatch')
class CheckAuthenticatedView(APIView):
    def get(self, request, format = None):
        IsAuthenticated = User.is_authenticated

        if IsAuthenticated:
            return Response({'isAuthenticated': 'success'}, status = status.HTTP_200_OK)
        else:
            return Response({'isAuthenticated': 'error'}, status = status.HTTP_400_BAD_REQUEST)


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
        if User.objects.filter(username = username).exists():
            return Response({'error': 'Account with name already exists.'}, status = status.HTTP_409_CONFLICT)
        else:
            if len(password) < 8:
                return Response({'error': 'Password is too short'}, status = status.HTTP_400_BAD_REQUEST)
            else:
                user = User.objects.create_user(username = username, password = password)
                user.save()
                user = User.objects.get(username = username)
                user_profile = UserProfile(user.id, name = name, email = email)
                user_profile.save()




@method_decorator(ensure_csrf_cookie, name = 'dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def get(self, request, format = None):
        return Response({'success': 'CSRF Cookie set'}, status = status.HTTP_200_OK)