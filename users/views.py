from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.generics import CreateAPIView, get_object_or_404
from .models import User
from .serializers import UserModelSerializer, SimpleUserModelSerializer
from rest_framework import mixins

# class UserApiView(viewsets.ViewSet):
#
#     def list(self, request):
#         users = User.objects.all()
#         serializer = SimpleUserModelSerializer(users, many=True)
#         return Response(serializer.data)
#
#     def retrieve(self, request, pk=None):
#         user = get_object_or_404(User, pk=pk)
#         serializer = SimpleUserModelSerializer(user)
#         return Response(serializer.data)


class UserModelViewSet(mixins.ListModelMixin,
                       mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin,
                       GenericViewSet):
    queryset = User.objects.all()
    serializer_class = SimpleUserModelSerializer
