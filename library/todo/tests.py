import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from todo.models import Project
from users.models import User
from users.views import UserModelViewSet


class TestUserViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'uid': '3753496a-cdec-4fe7-98ed-949307cd7781',
        'first_name': 'TestFirst', 'last_name': 'TestLast', 'username': 'TestUser', 'email': 'TestEmail'}, format='json')
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'uid': '3753496a-cdec-4fe7-98ed-949307cd7781',
        'first_name': 'TestFirst', 'last_name': 'TestLast', 'username': 'TestUser', 'email': 'TestEmail'}, format='json')
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        force_authenticate(request, admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        user = User.objects.create(uid='3753496a-cdec-4fe7-98ed-949307cd7781', first_name='TestFirst',
                                     last_name='TestLast', username='TestUser', email='TestEmail')
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        user = User.objects.create(uid='3753496a-cdec-4fe7-98ed-949307cd7781', first_name='TestFirst',
                                     last_name='TestLast', username='TestUser', email='TestEmail')
        client = APIClient()
        response = client.put(f'/api/users/{user.id}/', {'uid': '3753496a-cdec-4fe7-98ed-949307cd7781',
        'first_name': 'TestFirst_2', 'last_name': 'TestLast', 'username': 'TestUser', 'email': 'TestEmail'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        user = User.objects.create(uid='3753496a-cdec-4fe7-98ed-949307cd7781', first_name='TestFirst',
                                     last_name='TestLast', username='TestUser', email='TestEmail')
        client = APIClient()
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        client.login(username='admin', password='admin123456')
        response = client.put(f'/api/users/{user.id}/', {'uid': '3753496a-cdec-4fe7-98ed-949307cd7781',
        'first_name': 'TestFirst_2', 'last_name': 'TestLast', 'username': 'TestUser', 'email': 'TestEmail'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = User.objects.get(id=user.id)
        self.assertEqual(user.first_name, 'TestFirst_2')
        client.logout()


class TestProjectViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_mixer(self):
        project = mixer.blend(Project)
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/projects/{project.id}/', {'name': 'TestProject', 'user': project.users.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, 'TestProject')

    def test_get_detail(self):
        project = mixer.blend(Project, name='TestProject')
        response = self.client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_project = json.loads(response.content)
        self.assertEqual(response_project['name'], 'TestProject')

    def test_get_detail_user(self):
        project = mixer.blend(Project, user__name='Василий')
        response = self.client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_project = json.loads(response.content)
        self.assertEqual(response_project['user']['name'], 'Василий')
