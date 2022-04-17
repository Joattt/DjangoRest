from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import User


class SimpleUserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
