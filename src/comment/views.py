from django.shortcuts import render
from django.http import JsonResponse, Http404
from django.views import View
from django.contrib.auth.models import User
from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import generics, permissions, status
from .models import Comment
from django.db.models import Q
import pprint
import json


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
                except Exception as e:
                    print("An exception occurred:", str(e))
                    return Response({'error':'Something went wrong when create comment'}, status=status.HTTP_400_BAD_REQUEST)

                
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
        comments = Comment.objects.filter(labid=labid ,name = user.username)
        if not comments.exists():
            return Response({'error': 'No comments yet!'}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            # Delete comments
            comments.delete()
            return Response({'success': True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': f'Failed to delete comment, {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

