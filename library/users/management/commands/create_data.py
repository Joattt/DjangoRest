from django.core.management.base import BaseCommand
from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        super_user = User.objects.create_superuser('admin', 'test@test.com', '123')
        test_user1 = User.objects.create_user('test_user1', 'test_user1@mail.ru', '456')
        test_user2 = User.objects.create_user('test_user2', 'test_user2@mail.ru', '789')
