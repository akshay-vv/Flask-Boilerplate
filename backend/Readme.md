1. Goto Working Directory
   cd /FlaskBoilerPlate/backend

2. Set Python virtual env
   python -m venv venv
   *nix: source venv/bin/activate
   win: .\venv\Scripts\activate

3. Install dependencies
   pip install -r requirements.txt

4. Install Gunicorn Server
   pip install gunicorn

5. Run app
   gunicorn -b 0.0.0.0:8080 activator:app

6. Run as Service
   sudo systemctl enable flaskapp.service
   systemctl daemon-reload

Misc
====
1. Freeze pip requirements
   pip freeze > requirements.txt

2. Vscode LiveServer setting for live loading:
   "liveServer.settings.proxy": {
        "enable": true, //set it true to enable the feature.
        "baseUri": "/api/", //from where you want to proxy. 
        "proxyUri": "http://localhost:5000/api/" //the actual url.
   }