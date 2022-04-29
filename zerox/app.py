import yaml
from fastapi import FastAPI
from security.user_manager import fastapi_users, auth_backend
from db.db import init_client

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
        fastapi_users.get_register_router(),
        prefix="/auth",
        tags=["auth"],
    )

    app.include_router(
        fastapi_users.get_users_router(),
        prefix="/users",
        tags=["users"],
    )
    return app

app = create_app()