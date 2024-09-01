from fastapi import FastAPI
from api.routes.todo import todo_router
from api.routes.user import user_router
from api.routes.login import login_router
from tortoise.contrib.fastapi import register_tortoise
from fastapi.middleware.cors import CORSMiddleware






app = FastAPI()
app.include_router(todo_router)
app.include_router(user_router)
app.include_router(login_router)
app.add_middleware(
    CORSMiddleware,
    allow_methods = ["*"],
    allow_headers = ["*"],
    allow_credentials=True,
    allow_origins= ["http://localhost:3000"]

)

register_tortoise (
    app=app,
    db_url="sqlite://todo.db",
    add_exception_handlers=True,
    generate_schemas=True,
    modules={"models":["api.models.todo", "api.models.user"]}
)

@app.get("/")
def index():
    return {"status": "To do api is running"}