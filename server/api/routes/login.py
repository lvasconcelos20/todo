from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from api.models.user import User
from passlib.context import CryptContext
from datetime import timedelta, datetime
from tortoise.exceptions import DoesNotExist

import jwt

# Definindo o APIRouter
login_router = APIRouter(prefix="/user", tags=["Login"])

# Configurações de segurança e autenticação
SECRET_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Modelos Pydantic para validação
class Login(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    username: str


class UserUpdate(BaseModel):
    email: EmailStr = None
    password: str = None
    username: str = None

# Função para verificar a senha
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Função para autenticar o usuário
async def authenticate_user(email: str, password: str):
    print(f"Autenticando usuário com email: {email}")
    
    try:
        user = await User.get(email=email)
        print(f"Usuário encontrado: {user.username}")
    except DoesNotExist:
        print("Usuário não encontrado")
        return None

    if not verify_password(password, user.password):
        print("Senha incorreta")
        return None

    print("Usuário autenticado com sucesso")
    return user

# Função para criar um token JWT
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()         
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Função para obter o usuário autenticado a partir do token
async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        user = await User.get(email=email)
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

# Rota para login
@login_router.post("/login")
async def login(login_data: Login):
    user = await authenticate_user(login_data.email, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "username": user.username,}

# Rota GET para obter informações do usuário autenticado
@login_router.get("/login", response_model=UserResponse)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@login_router.put("/login", response_model=UserResponse)
async def update_user_me(update_data: UserUpdate, current_user: User = Depends(get_current_user)):
    update_data_dict = update_data.dict(exclude_unset=True)

    if "password" in update_data_dict:
        update_data_dict["password"] = pwd_context.hash(update_data_dict["password"])

    await User.filter(id=current_user.id).update(**update_data_dict)
    await current_user.refresh_from_db()
    return current_user

# Rota DELETE para excluir o usuário autenticado
@login_router.delete("/login", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user_me(current_user: User = Depends(get_current_user)):
    await User.filter(id=current_user.id).delete()
    return {"detail": "User deleted successfully"}