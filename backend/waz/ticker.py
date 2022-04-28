from mongoengine import *


class Ticker(DynamicDocument):
    name = StringField(primary_key=True)
    quote_unit = StringField()
    ticker_name = StringField()
    spread = FloatField()
    last = StringField()