import os

from flask import Flask, Blueprint, send_from_directory
from waz.routes import waz_api
from flask_mongoengine import MongoEngine

def init(*args, **argv): 
    pass

def create_app():
    app = Flask(__name__, static_folder='../ui/build', static_url_path='/')

    # Docusaurus custom site
    app.config['DOC_PATH'] = "../docs/build"
    blueprint = Blueprint('site', __name__, static_url_path='/docusaurus', static_folder=app.config['DOC_PATH'])
    app.register_blueprint(blueprint)
    
    # Api's go in here
    app.register_blueprint(waz_api, url_prefix="/api/waz")

    # MongoDB Config
    app.config['MONGODB_SETTINGS'] = {
        'db': 'zerox'
    }
    init()
    return app

app = create_app()
app.secret_key = os.urandom(12)
db = MongoEngine(app)


@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/docusaurus')
def doc_index():
    return send_from_directory(app.config['DOC_PATH'], "index.html")

