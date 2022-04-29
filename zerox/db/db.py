import motor.motor_asyncio
from fastapi_users.db import MongoDBUserDatabase
from fastapi_users_db_mongodb.access_token import MongoDBAccessTokenDatabase

from models.user import UserDB
from models.access_token import AccessToken

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

def get_ticker_db():
    return ticker_collection

async def get_user_db():
    global users_collection
    yield MongoDBUserDatabase(UserDB, users_collection)

async def get_access_token_db():
    global access_tokens_collection 
    yield MongoDBAccessTokenDatabase(AccessToken, access_tokens_collection)
