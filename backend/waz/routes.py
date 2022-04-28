import json

from flask import  Response, Blueprint
from waz.ticker import Ticker
from typing import List
from waz.spread import WazSpread

waz_api = Blueprint("waz_api", __name__)

@waz_api.route('/spread')
def get_spread():
    tick = Ticker(name="hi", quote_unit="1", ticker_name="a", spread = 10, last="Hello")
    # tick.save()
    Ticker.objects.insert([tick], load_bulk=False)
    # waz_spread = WazSpread()
    # return Response(response=json.dumps(waz_spread.get_spread()), mimetype="application/json")
    
@waz_api.route('/calculatespread')
def calculate_spread():
    waz_spread = WazSpread()
    waz_spread.calculate()
    return Response(response=json.dumps({"message": "Request has been queued"}), mimetype="application/json")