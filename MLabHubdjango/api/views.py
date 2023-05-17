from django.shortcuts import render
from django.http import JsonResponse, Http404
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from MLabHub.db_model import get_pg_db
from rest_framework.response import Response
from rest_framework import generics
from .serializers import LabSerializer
from .models import Lab, Comment
import pprint
import json

class GetLabInfo(generics.GenericAPIView):
    queryset = Lab.objects.all()
    serializer_class = LabSerializer
    def get(self, request):
        data = self.get_queryset()
        serializer = self.get_serializer(data, many=True)
        #pprint.pprint(serializer.data)
        return JsonResponse(serializer.data, safe = False)
        return Response(serializer.data)
    

class GetDetailedLabInfo(generics.GenericAPIView):
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

class AddComments(View):
    def post(self, request, labid):
        logname = request.session.get('logname')
        if logname is None:
            return JsonResponse({'error': 'Please login to comment'}, status=401)
        try:
            body = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'No body json'}, status=401)

        connection = get_pg_db()
        # check wether comments exist
        cur = connection.execute(
            """SELECT id FROM comments
                WHERE name = %(name)s
            """,{'name': logname}).fetchall()

        if cur:
            return JsonResponse({'error': 'Already comment! Please Remove comment first.'}, 401)

        # add more detailed select for more rich content
        try:
            cur = connection.execute(
                """
                INSERT INTO comments(labid,rating,name,word)
                VALUES (%(labid)s, %(rating)s, %(name)s, %(word)s)
                """, {
                    'labid': labid,
                    'rating': rating,
                    'name': name,
                    'word': word
                    })
            connection.commit()
        except Exception as e:
            return JsonResponse({'error': f'Failed to insert comment, {e}'}, 500)
        return JsonResponse({'success': True}, 200)

class DeleteComments(View):
    def post(self, request, labid):
        logname = request.session.get('logname')
        if logname is None:
            return JsonResponse({'error': 'Please login to comment'}, status=401)
        connection = get_pg_db()
        # check wether comments exist
        cur = connection.execute(
            """SELECT id FROM comments
                WHERE name = %(name)s
            """,{'name': logname}).fetchall()

        if not cur:
            return JsonResponse({'error': 'No comments yet!'}, 401)
        try:
            cur = connection.execute(
                """
                DELETE FROM comments
                WHERE name = %(name)s
                """, {
                    'name': logname
                })
        except Exception as e:
            return JsonResponse({'error': f'Failed to delete comment, {e}'}, 500)
        return JsonResponse({'success': True}, 200)