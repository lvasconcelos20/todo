from tortoise.models import Model
from tortoise.fields import IntField, CharField, BooleanField


class User(Model):
    id = IntField(pk=True)
    username = CharField(max_length=50, null=False)
    email = CharField(max_length=100, unique=True, null=False)
    password = CharField(max_length=128, null=False)
    is_active = BooleanField(default=True, null=False)