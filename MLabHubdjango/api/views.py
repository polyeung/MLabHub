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
from .serializers import LabSerializer
from .models import Lab, Comment
import pprint
import json

class GetLabInfo(APIView):
    permission_classes = (permissions.AllowAny, )
    def get(self, request):
        labs = Lab.objects.all()
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

class GetComments(View):
    def get(self, request, id):
        comments = Comment.objects.filter(labid=id).values('id', 'rating', 'name', 'word')
        comments_list = list(comments)
        return JsonResponse(comments_list, safe=False)


@method_decorator(csrf_exempt, name = 'dispatch')
class AddComments(APIView):
    def post(self, request, labid):

        try:
            print('Before authenticated')
            IsAuthenticated = User.is_authenticated
            print(IsAuthenticated)
            if IsAuthenticated:
                data = self.request.data
                print(data)
                try:
                    rating = data['rating']
                    name = data['name']
                    word = data['word']
                    print(rating, name, word)
                    Comment.objects.create(
                        labid_id=labid, 
                        rating=rating, 
                        name=name,
                        word=word
                    )
                    return Response({'success': True}, status = status.HTTP_200_OK)
                except:
                    return Response({'error':'Something went wrong when create comment'})

                
            else:
                return Response({'error': 'Please login to comment'}, status = status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({'error':"Something went wrong when checking authentication status"})


@method_decorator(csrf_exempt, name='dispatch')
class DeleteComments(APIView):
    def post(self, request, labid):
        user = request.user

        # Check if user is authenticated
        if not user.is_authenticated:
            return Response({'error': 'Please login to comment'}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Check if comments exist
        comments = Comment.objects.filter(labid=self.request.id)
        if not comments.exists():
            return Response({'error': 'No comments yet!'}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            # Delete comments
            comments.delete()
            return Response({'success': True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': f'Failed to delete comment, {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
