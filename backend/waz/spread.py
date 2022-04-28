import json
import asyncio
import platform
import time

from concurrent.futures import ThreadPoolExecutor, Future
from typing import List
from utils.logger import log
from utils.singleton import Singleton
from waz.ticker import Ticker
from waz.api import WazApi


class WazSpread(metaclass=Singleton):
    waz_api: WazApi = None
    spread: List[Ticker] = []
    future: Future = None

    def __init__(self) -> None:
        pass

    def get_spread(self) -> list:
        if not self.spread:
            with open("./spread.json") as f:
                self.spread = self._to_model(json.load(f))
        return self.spread

    def calculate(self) -> Future:
        if self.future is None or not self.future.running():
            with ThreadPoolExecutor() as executor:
                self.future = executor.submit(self._calculate)
        return self.future

    def _calculate(self) -> List[dict]:
        waz_api = self._get_waz_api()

        if platform.system() == 'Windows':
            asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        tickers = loop.run_until_complete(self._get_tickers())

        asyncio.run(self._get_bids(tickers))
        # Filter out tickers that have bids
        tickers = list(filter(lambda ticker: "bids" in ticker, tickers))
        log.info(f"Total inr and usdt tickers {len(tickers)}")
        self._calculate_spread(tickers)
        self.spread = self._to_model(tickers)
        Ticker.objects.insert(self.spread, load_bulk=False)
        return self.spread
    
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
        json.dump(tickers, open('./spread.json', 'w'), indent=4 )

    def _to_model(self, tickers) -> List[Ticker]:
        _tickers: List[Ticker] = []
        for ticker in tickers:
            _tickers.append(Ticker(**ticker))
        return _tickers

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
            _tickers.append(ticker_details)
        return _tickers

    def _get_waz_api(self):
        if self.waz_api is None:
            self.waz_api = WazApi()
        return self.waz_api