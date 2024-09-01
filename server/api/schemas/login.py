from pydantic import BaseModel, EmailStr
from tortoise.contrib.pydantic import pydantic_model_creator
from api.models.user import User



class Login(BaseModel):
    email: EmailStr
    password: str



async def authenticate_user(email: str, password: str):
    user = await User.get(email=email)
    if not user:
        return None
    if not user.verify_password(password):
        return None
    
    return user
