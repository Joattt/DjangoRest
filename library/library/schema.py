import graphene
from graphene_django import DjangoObjectType
from todo.models import Project, ToDo
from users.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(UserType)
    all_todos = graphene.List(ToDoType)
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    projects_by_user_username = graphene.List(ProjectType, name=graphene.String(required=False))

    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_all_users(self, info):
        return User.objects.all()

    def resolve_all_todos(self, info):
        return ToDo.objects.all()

    def resolve_project_by_id(self, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    def resolve_projects_by_user_username(self, info, username=None):
        projects = Project.objects.all()
        if username:
            projects = projects.filter(user__username=username)
        return projects


schema = graphene.Schema(query=Query)
