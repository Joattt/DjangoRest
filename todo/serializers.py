from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from users.serializers import UserModelSerializer
from .models import Project, ToDo


class ProjectModelSerializer(ModelSerializer):
    users = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'
        # fields = ['id', 'users']


class ToDoModelSerializer(ModelSerializer):
    user = UserModelSerializer()

    class Meta:
        model = ToDo
        fields = '__all__'
