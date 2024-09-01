from pydantic import BaseModel, Field
from typing import Optional
from tortoise.contrib.pydantic import pydantic_model_creator
from api.models.todo import Todo


GetTodo = pydantic_model_creator(Todo, name="Todo")

class PostTodo(BaseModel):
    
    title:str = Field(...,max_length=100)
    description: str = Field(..., min_length=1, max_length=255)
    done:bool

class PutTodo(BaseModel):
    title: Optional[str] = Field(Todo, max_length=100)
    description: Optional[str] = Field(None, min_length=1, max_length=255)
    done: Optional[bool]