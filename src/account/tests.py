from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from .views import CheckAuthenticatedView

class CheckAuthenticatedViewTest(APITestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')

    def test_authenticated_user(self):
        self.client.login(username='testuser', password='12345')
        response = self.client.get('/api/account/is_login/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('username', response.data)
        self.assertEqual(response.data['username'], self.user.username)

    def test_unauthenticated_user(self):
        response = self.client.get('/api/account/is_login/')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'isAuthenticated': 'error'})

