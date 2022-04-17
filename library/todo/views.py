from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer, ProjectSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination

    def get_queryset(self):
        return Project.objects.filter(name__contains='2')

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ProjectSerializer
        return ProjectModelSerializer

    # def get_queryset(self):
    #     param = self.request.headers.get('param')
    #     return Project.objects.filter(name__contains=param)


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    filterset_fields = ['project']
    pagination_class = ToDoLimitOffsetPagination
