from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import get_config

db = SQLAlchemy()


def create_app(env=None):
    app = Flask(__name__)
    cors = CORS(app, resources={r"*": {"origins": "*"}})
    app.config.from_object(get_config(env))
    db.init_app(app)
    return app
