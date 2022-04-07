from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=64)
    repository_link = models.URLField()
    users = models.ManyToManyField(User)


class ToDo(models.Model):
    project = models.CharField(max_length=64)
    text = models.TextField()
    date_created = models.DateField()
    date_updated = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
