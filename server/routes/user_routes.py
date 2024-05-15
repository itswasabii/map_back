from flask_restful import Resource
from flask import request
from models import db
from models.user_model import User
from datetime import datetime

class Users(Resource):
    def get(self):
        users = User.query.all()
        user_data = [{'user_id': user.user_id, 'username': user.username} for user in users]
        return user_data

    def post(self):
        data = request.json
        new_user = User(
            username=data['username'],
            email=data['email'],
            password_hash=data['password_hash'],
            role=data['role'],
            joined_at=datetime.utcnow()
        )
        db.session.add(new_user)
        db.session.commit()
        return {'message': 'User created successfully'}, 201
