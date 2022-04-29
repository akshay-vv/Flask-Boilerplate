import aiohttp
import json

class WazApi:
    WAZIRX_BASE_URL = "https://api.wazirx.com"
    API_TICKER = "/api/v2/tickers"
    API_DEPTH= "/api/v2/depth"

    async def get_tickers(self) -> dict:
        async with aiohttp.request("GET", self.WAZIRX_BASE_URL + self.API_TICKER) as response:
            result = await response.text()
            return json.loads(result)

    async def get_depth(self, ticker) -> dict:
        async with aiohttp.request("GET", f"{self.WAZIRX_BASE_URL}{self.API_DEPTH}?market={ticker}") as response:
            result = await response.text()
            return json.loads(result)
