from fastapi import APIRouter, HTTPException, status
from api.models.user import User
from api.schemas.user import GetUser, UserCreate, UserOut, UserPut
from tortoise.contrib.pydantic import pydantic_model_creator
from passlib.hash import bcrypt


# Configurações diretamente no código
SECRET_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
ALGORITHM = "HS256"

user_router = APIRouter(prefix="/users", tags=["Users"])

User_Pydantic = pydantic_model_creator(User, name="User")

@user_router.get("/")
async def all_users():
    data = User.all()
    return await GetUser.from_queryset(data)


@user_router.post("/", response_model=UserOut)
async def create_user(user: UserCreate):
    existing_user = await User.filter(email=user.email).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email já está em uso")
    user_obj = User(
        username=user.username,
        email=user.email,
        password=bcrypt.hash(user.password)
    )       
    await user_obj.save()
    return await User_Pydantic.from_tortoise_orm(user_obj)

@user_router.put("/{user_id}", response_model=UserOut)
async def update_user(user_id: int, user: UserPut):
    existing_user = await User.get(id=user_id)
    if not existing_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    user_data = user.dict(exclude_unset=True)
    if "password" in user_data:
        user_data["hashed_password"] = bcrypt.hash(user_data.pop("password"))

    await existing_user.update_from_dict(user_data)
    await existing_user.save()
    return await User_Pydantic.from_tortoise_orm(existing_user)

@user_router.delete("/{user_id}")
async def delete_user(user_id: int):
    user = await User.filter(id=user_id).exists()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    await User.filter(id=user_id).delete()
    return {"message": "User deleted successfully"}