import motor.motor_asyncio
from typing import Optional, List
from beanie import PydanticObjectId
from fastapi_users.db import BeanieBaseUser, BeanieUserDatabase
from fastapi_users.db import BaseOAuthAccount, BeanieBaseUser, BeanieUserDatabase
from fastapi_users_db_beanie.access_token import BeanieAccessTokenDatabase, BeanieBaseAccessToken
from pydantic import Field

client = None
db = None
users_collection = None
access_tokens_collection = None
ticker_collection = None

def init_client(config):
    global client, db, users_collection, access_tokens_collection, ticker_collection
    client = motor.motor_asyncio.AsyncIOMotorClient(config["dburl"], uuidRepresentation="standard") 
    db = client[config["dbname"]]
    users_collection = db["users"]
    access_tokens_collection = db["access_tokens"]
    ticker_collection = db["ticker"]
    waz_ticker_collection = db["waz_ticker"]
    waz_transaction_collection = db["waz_transaction"]
    waz_p2p_collection = db["waz_p2p"]
    waz_wallet_collection = db["waz_wallet"]

def get_db():
    return db

def get_ticker_db():
    return ticker_collection

class AccessToken(BeanieBaseAccessToken[PydanticObjectId]):  
    pass

class User(BeanieBaseUser[PydanticObjectId]):
    first_name: str
    last_name: Optional[str]

async def get_user_db():
    yield BeanieUserDatabase(User)

async def get_access_token_db():
    yield BeanieAccessTokenDatabase(AccessToken)