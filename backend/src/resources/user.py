from flask import request, jsonify
from flask_restful import Resource, reqparse
import jwt
import datetime
from werkzeug.security import generate_password_hash, check_password_hash

from repositories import UserRepository


class SignUp(Resource):
    def post(self):
        """
        Sign Up
        """
        parser = reqparse.RequestParser()
        parser.add_argument("name", type=str, location="form")
        parser.add_argument("password", type=str, location="form")
        parser.add_argument("nickname", type=str, location="form")
        # parser.add_argument('profile', type=werkzeug.datastructures.FileStorage, location='files')
        args = parser.parse_args()
        name = args["name"]
        password = args["password"]
        nickname = args["nickname"]
        # profile_file = args['profile']
        profile = name + ".jpg"
        # profile_file.save(profile)
        try:
            hash = generate_password_hash(password, method="sha256")
            user = UserRepository.create(name, hash, nickname, profile)
            print("User created", user)
            token = jwt.encode(
                {
                    "id": user["id"],
                    "username": user["name"],
                    "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
                },
                "SECRET",
            )
            response = {
                "data": {"user": user, "csrf_token": token},
                "code": 200,
                "messages": [{"content": "Success", "type": 4}],
            }
            status_code = 200
            return response, status_code, {"Content-Type": "json; charset=utf-8"}
        except Exception as e:
            print(e)
            response = {
                "data": {},
                "code": 400,
                "messages": [{"content": "Fail", "type": 1}],
            }
            return response, 400, {"Content-Type": "json; charset=utf-8"}


class SignIn(Resource):
    def post(self):
        """
        Sign In
        """
        request_json = request.get_json(silent=True)
        name: str = request_json["username"]
        password: str = request_json["password"]
        try:
            user = UserRepository.get(name)
            if check_password_hash(user["password"], password):
                token = jwt.encode(
                    {
                        "id": user["id"],
                        "username": user["name"],
                        "exp": datetime.datetime.utcnow()
                        + datetime.timedelta(minutes=30),
                    },
                    "SECRET",
                )
                response = {
                    "data": {"user": user, "csrf_token": token},
                    "code": 200,
                    "messages": [{"content": "Success", "type": 4}],
                }
                status_code = 200
                return response, status_code, {"Content-Type": "json; charset=utf-8"}
            else:
                raise Exception
        except Exception as e:
            print(e)
            response = {
                "data": {},
                "code": 400,
                "messages": [{"content": "Fail", "type": 1}],
            }
            return response, 400, {"Content-Type": "json; charset=utf-8"}


class SignOut(Resource):
    def post(self):
        """
        Sign Out
        """
        response = {
            "data": {},
            "code": 200,
            "messages": [{"content": "Success", "type": 4}],
        }
        status_code = 200
        return response, status_code, {"Content-Type": "json; charset=utf-8"}
