from fastapi import Depends, Request
from typing import Optional
from fastapi_users import BaseUserManager, FastAPIUsers
from fastapi_users.authentication import BearerTransport,  AuthenticationBackend
from fastapi_users.authentication.strategy.db import AccessTokenDatabase, DatabaseStrategy
from models.access_token import AccessToken
from db.db import get_access_token_db, get_user_db
from models.user import UserCreate, UserDB, User, UserUpdate

SECRET = "SECRET"
bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")

def get_database_strategy(access_token_db:AccessTokenDatabase[AccessToken] = Depends(get_access_token_db)) -> DatabaseStrategy[UserCreate, UserDB, AccessToken]:

    return DatabaseStrategy(access_token_db, lifetime_seconds=3600)

auth_backend = AuthenticationBackend(
    name="database",
    transport=bearer_transport,
    get_strategy=get_database_strategy
)

class UserManager(BaseUserManager[UserCreate, UserDB]):
    user_db_model = UserDB
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, user: UserDB, request: Optional[Request] = None):
        print(f"User {user.id} has registered.")

    async def on_after_forgot_password(
        self, user: UserDB, token: str, request: Optional[Request] = None
    ):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(
        self, user: UserDB, token: str, request: Optional[Request] = None
    ):
        print(f"Verification requested for user {user.id}. Verification token: {token}")


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)

fastapi_users = FastAPIUsers(
    get_user_manager,
    [auth_backend],
    User,
    UserCreate,
    UserUpdate,
    UserDB,
)