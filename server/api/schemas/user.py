from pydantic import BaseModel, EmailStr, validator
from typing import Optional
from tortoise.contrib.pydantic import pydantic_model_creator
from api.models.user import User


GetUser = pydantic_model_creator(User, name="User")

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    confirm_password: str

    @validator('confirm_password')
    def password_match(cls, v, values, **kwargs):
        if'password' in values and v != values['password']:
            raise ValueError('Passwords do not match')
        return v

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_active: bool


class UserPut(BaseModel):
    username: Optional[str]
    email: Optional[EmailStr]
    password: Optional[str]