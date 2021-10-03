import os
import logging
import requests
import json
from flask import Flask, request

logging.basicConfig(filename='./app.log',
                    filemode='a',
                    format='%(asctime)s,%(msecs)d %(name)s %(levelname)s %(message)s',
                    datefmt='%d-%m-%Y %I:%M:%S %p',
                    level=logging.DEBUG)

logger = logging.getLogger('app_logger')

def init(*args, **argv):
    logger.info("Initializing...")

def create_app():
    logger
    app = Flask(__name__, static_folder='../ui/build', static_url_path='/')
    init()
    return app

app = create_app()
app.secret_key = os.urandom(12)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/test')
def test():
    req_json = request.get_json(silent=False)
    logger.info(req_json)
    response = requests.get("https://jsonplaceholder.typicode.com/todos/1")
    return json.loads(response.text)

