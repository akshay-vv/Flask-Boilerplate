import json
import asyncio
import time

from typing import List
from waz.api import WazApi
import logging
log = logging.getLogger("uvicorn")


class WazSpread():
    waz_api: WazApi = None

    def __init__(self) -> None:
        pass

    async def calculate(self):
        tickers =  await self._get_tickers()
        await self._get_bids(tickers)
        # Filter out tickers that have bids
        tickers = list(filter(lambda ticker: "bids" in ticker, tickers))
        log.info(f"Total inr and usdt tickers {len(tickers)}")
        self._calculate_spread(tickers)
        return tickers
    
    async def _get_bids(self, tickers):
        waz_api = self._get_waz_api()
        tasks = []
        for ticker in tickers:
            tasks.append(waz_api.get_depth(ticker["ticker_name"]))

        start_time = time.time()
        results = await asyncio.gather(*tasks)
        end_time = time.time()

        log.info(f"Gather took {end_time-start_time} for {len(tickers)} items")
        for idx, ticker in enumerate(tickers):
            bids = results[idx]["bids"]
            if bids:
                ticker["bids"] = bids

    def _calculate_spread(self, tickers):
        current_time = time.time()
        for ticker in tickers:
            bids = ticker["bids"]

            high = float(bids[0][0])
            low = float(bids[-1][0])
            ticker["spread"] =((high - low) / low) * 100
            ticker["last_updated"] = current_time

        tickers.sort(key=lambda item: item['spread'], reverse=True)

    async def _get_tickers(self):
        waz_api = self._get_waz_api()
        tickers_raw = await waz_api.get_tickers()

        # Convert Objects to List
        tickers:List[dict] = self._normalize(tickers_raw)

        # filter out INR and USDT Pairs
        filter_pairs = ["inr", "usdt"]
        return list(filter(lambda ticker: ticker["quote_unit"] in filter_pairs, tickers))
        

    def _normalize(self, tickers) -> List[dict]:
        _tickers = []
        for ticker, ticker_details in tickers.items():
            ticker_details["ticker_name"] = ticker
            ticker_details["_id"] = ticker_details["name"]
            _tickers.append(ticker_details)
        return _tickers

    def _get_waz_api(self):
        if self.waz_api is None:
            self.waz_api = WazApi()
        return self.waz_api

def get_waz() -> WazSpread:
    return WazSpread()