from fastapi import APIRouter, Depends
from db.db import get_ticker_db, User
from security.user_manager import current_active_user
from waz.spread import get_waz
import logging
log = logging.getLogger("uvicorn")


router = APIRouter(
    prefix="/api/waz",
    tags=["waz"],
    responses={404: {"description": "Not found"}},
)

@router.get("/spread")
async def get_spread():
    ticker_collection = get_ticker_db()
    cursor = ticker_collection.find()
    tickers = []
    for ticker in await cursor.to_list(length=1000):
        tickers.append(ticker)
    return tickers

@router.post("/calculatespread")
async def calculate_spread(user: User = Depends(current_active_user)):
    waz = get_waz()
    result = await waz.calculate()
    ticker_collection = get_ticker_db()
    await ticker_collection.delete_many({})
    await ticker_collection.insert_many(
        result
    )
    return result