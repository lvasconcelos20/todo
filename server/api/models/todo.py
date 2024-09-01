from tortoise.models import Model
from tortoise.fields import IntField, BooleanField, CharField


class Todo(Model):
    id = IntField(pk=True)
    title = CharField(max_length=100, null=False)
    description = CharField(max_length=255, null=False)
    done = BooleanField(default=False,null=False)
