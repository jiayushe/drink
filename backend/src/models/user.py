from . import db
from .abc import BaseModel

import datetime


class User(db.Model, BaseModel):
    name = db.Column(db.String, primary_key=True, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    nickname = db.Column(db.String, nullable=True)
    profile = db.Column(db.String, nullable=True)
    date_created = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, name: str, password: str, nickname: str, profile: str = ""):
        self.name = name
        self.password = password
        self.nickname = nickname
        self.profile = profile
