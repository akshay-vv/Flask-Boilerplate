from re import DEBUG
import yaml
import logging
from fastapi import FastAPI
from beanie import init_beanie
from security.user_manager import fastapi_users, auth_backend
from db.db import init_client, get_db, User, AccessToken
from routers.waz import router as waz_router 
from fastapi.staticfiles import StaticFiles
from models.user import UserCreate, UserRead
log = logging.getLogger("uvicorn")

CONFIG_FILE = "config.yml"

def read_config():
    with open(CONFIG_FILE) as f:
        return yaml.safe_load(f)

def create_app():
    config = read_config()

    app = FastAPI()
    init_client(config)

    app.include_router(
        fastapi_users.get_auth_router(auth_backend),
        prefix="/auth/jwt",
        tags=["auth"],
    )
    app.include_router(
        fastapi_users.get_register_router(UserRead, UserCreate),
        prefix="/auth",
        tags=["auth"],
    )

    app.include_router(
        fastapi_users.get_users_router(UserRead, UserCreate),
        prefix="/users",
        tags=["users"],
    )
    app.include_router(waz_router)

    app.mount("/", StaticFiles(directory="../ui/build", html = True), name="ui")
    app.mount("/docusaurus", StaticFiles(directory="../docs/build", html = True), name="docs")

    log.info("App is initialized")
    return app

app = create_app()

@app.on_event("startup")
async def on_startup():
    await init_beanie(
        database=get_db(),
        document_models=[
            User,
            AccessToken,
        ],
    )