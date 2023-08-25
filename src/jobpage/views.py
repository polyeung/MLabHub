from django.shortcuts import render
from django.http import JsonResponse, Http404
from django.views import View
from django.contrib.auth.models import User
from rest_framework.views import APIView
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect, csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import generics, permissions, status
from .models import JobData
from lab.models import Lab
from .serializers import JobDataSerializer
import pprint
import json
from rest_framework import viewsets
from django.core.serializers import serialize
from account.models import UserProfile

class JobViewSet(viewsets.ReadOnlyModelViewSet):
    pagination_class = None
    serializer_class = JobDataSerializer
    permission_classes = [permissions.AllowAny]
    queryset = JobData.objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        if self.request.user.id:
            context['saved_jobs'] = self.get_saved_jobs(self.request.user.id)
        else:
            context['saved_jobs'] = []
        return context

    def get_saved_jobs(self, uid):
        print("user id: ", uid)
        if uid is None:
            return []
        data = serialize('json',UserProfile.objects.filter(uid=uid))
        parsed_data = json.loads(data)
        ret_data = []
        if len(parsed_data) > 0:
            ret_data = parsed_data[0]['fields']['data']['savedJobs']
        return ret_data

@method_decorator(csrf_protect, name='dispatch')
class PostNewJob(APIView):
    def post(self, request):
        try:
            is_authenticated = request.user.is_authenticated
            if is_authenticated:
                data = request.data
                print(data)
                try:
                    labid = data['labid']
                    title = data['title']
                    course = data['course']
                    rate_type = data['rate_type']
                    rate = data['rate']
                    contact = data['contact']
                    intro = data['intro']
                    labname = data['labname']
                    lablink = data['lablink']
                    work_hours_selection = data['workhoursselection']
                    work_model = data['workmodel']
                    consecutive_semesters_select = data['consecutivesemestersselect']

                    JobData.objects.create(
                        labid_id=labid,
                        title=title,
                        course=course,
                        rate_type=rate_type,
                        rate=rate,
                        contact=contact,
                        intro=intro,
                        labname=labname,
                        lablink=lablink,
                        workhoursselection=work_hours_selection,
                        workmodel=work_model,
                        consecutivesemestersselect=consecutive_semesters_select,
                        oidc_auth_user=request.user
                    )

                    return Response({'success': True}, status=status.HTTP_200_OK)
                except KeyError:
                    return Response({'error': 'Required field(s) are missing'}, status=status.HTTP_400_BAD_REQUEST)
                except Exception as e:
                    return Response({'error': f'Something went wrong when posting job: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({'error': 'Please login to post your job'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({'error': f'Something went wrong when posting a new job: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_protect, name='dispatch')
class delete_job(APIView):
    def delete(self, request, job_id):
        try:
            is_authenticated = request.user.is_authenticated
            if is_authenticated:
                try:
                    job = JobData.objects.get(id=job_id, oidc_auth_user=request.user)
                    job.delete()
                    return Response({'success': 'Job deleted successfully'}, status=status.HTTP_200_OK)
                except JobData.DoesNotExist:
                    return Response({'error': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)
                except Exception as e:
                    return Response({'error': f'Something went wrong when deleting the job: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'Please login to delete the job'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({'error': f'Something went wrong when deleting the job: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
