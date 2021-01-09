from sqlalchemy.exc import IntegrityError
from exceptions import ResourceExists
from models import User


class UserRepository:
    @staticmethod
    def create(name: str, password: str, nickname: str, profile: str) -> dict:
        """ Create user """
        result: dict = {}
        try:
            print(name, password, nickname, profile)
            user = User(
                name=name, password=password, nickname=nickname, profile=profile
            )
            user.save()
            result = {
                "id": 1,
                "name": user.name,
                "password": user.password,
                "nickname": user.nickname,
                "profile": user.profile,
                "date_created": str(user.date_created),
            }
        except IntegrityError:
            User.rollback()
            raise ResourceExists("user already exists")

        return result

    @staticmethod
    def get(name: str) -> dict:
        """ Query a user by name """
        user: dict = {}
        user = User.query.filter_by(name=name).first_or_404()
        user = {
            "id": 1,
            "name": user.name,
            "password": user.password,
            "nickname": user.nickname,
            "profile": user.profile,
            "date_created": str(user.date_created),
        }
        return user
