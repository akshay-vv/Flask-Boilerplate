from typing import Optional
from beanie import PydanticObjectId
from fastapi_users import schemas


class UserRead(schemas.BaseUser[PydanticObjectId]):
    first_name: str
    last_name: Optional[str]

class UserCreate(schemas.BaseUserCreate):
    first_name: str
    last_name: Optional[str]

class UserUpdate(schemas.BaseUserUpdate):
    first_name: Optional[str]
    last_name: Optional[str]

