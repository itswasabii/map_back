# routes/user_routes.py

from flask_restful import Resource
from flask import request, jsonify, make_response
from models import db
from models.user_model import User, ResetToken # Ensure Course is imported if it's a model
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
import secrets
import jwt
import os
from flask_mail import Message
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app import mail  # Import the mail object from app.py
from dotenv import load_dotenv

load_dotenv()

jwt_secret_key = os.getenv('JWT_SECRET_KEY')

class Users(Resource):
    def get(self):
        users = User.query.all()
        user_data = []
        for user in users:
            user_dict = {
                'user_id': user.user_id,
                'username': user.username,
                'email': user.email,
                'bio': user.bio,
                'occupation': user.occupation,
                'qualification': user.qualification,
                'location': user.location,
                'profile_picture_url': user.profile_picture_url,
                'cohorts': [
                    {
                        'cohort_id': member.cohort.cohort_id,
                        'cohort_name': member.cohort.cohort_name,
                    } for member in user.cohort_memberships
                ],
                'course': [course.course_name for course in user.courses],
                'joined_at': user.joined_at.isoformat(),
                'posts': [
                    {
                        'content': post.content,
                        'created_at': post.created_at.isoformat(),
                    } for post in user.posts
                ]
            }
            user_data.append(user_dict)
        return make_response(jsonify(user_data), 200)

    def post(self):
        data = request.json
        new_user = User(
            username=data['username'],
            email=data['email'],
            password_hash=generate_password_hash(data['password'], method='pbkdf2:sha512'),
            bio=data['bio'],
            joined_at=datetime.utcnow()
        )
        db.session.add(new_user)
        db.session.commit()
        course_name = data['course']
        course = Course.query.filter_by(course_name=course_name).first()
        if course:
            new_user.courses.append(course)
            db.session.commit()
            return make_response(jsonify({'message': 'User created and associated with the course successfully'}), 201)
        else:
            return make_response(jsonify({'error': f'Course "{course_name}" not found'}), 404)

class UserProfile(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.get_or_404(user_id)
        user_data = {
            'user_id': user.user_id,
            'username': user.username,
            'email': user.email,
            'bio': user.bio,
            'occupation': user.occupation,
            'qualification': user.qualification,
            'location': user.location,
            'profile_picture_url': user.profile_picture_url,
            'cohorts': [
                {
                    'cohort_id': member.cohort.cohort_id,
                    'cohort_name': member.cohort.cohort_name,
                } for member in user.cohort_memberships
            ],
            'course': [course.course_name for course in user.courses],
            'joined_at': user.joined_at.isoformat(),
            'posts': [
                {
                    'content': post.content,
                    'created_at': post.created_at.isoformat(),
                } for post in user.posts
            ]
        }
        return make_response(jsonify(user_data), 200)

    @jwt_required()
    def put(self):
        user_id = get_jwt_identity()
        data = request.json
        user = User.query.get_or_404(user_id)
        user.bio = data.get('bio', user.bio)
        user.occupation = data.get('occupation', user.occupation)
        user.qualification = data.get('qualification', user.qualification)
        user.location = data.get('location', user.location)
        user.profile_picture_url = data.get('profile_picture_url', user.profile_picture_url)
        db.session.commit()
        return make_response(jsonify({'message': 'User profile updated successfully'}), 200)

class Register(Resource):
    def post(self):
        data = request.json
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        hashed_pass = generate_password_hash(password, method='pbkdf2:sha512')
        try:
            new_user = User(username=username, password_hash=hashed_pass, email=email, bio='', occupation='', qualification='', location='', profile_picture_url='', joined_at=datetime.utcnow())
            db.session.add(new_user)
            db.session.commit()
            return make_response(jsonify({'message': 'User has been registered'}), 200)
        except IntegrityError:
            db.session.rollback()
            return make_response(jsonify({'error': 'Username or email already exists'}), 400)

class Login(Resource):
    def post(self):
        data = request.json
        username = data.get('username')
        password = data.get('password')
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password_hash, password):
            role = user.role
            access_token = create_access_token(identity={'user_id': user.user_id, 'role': role}, expires_delta=timedelta(hours=24))
            return make_response(jsonify({'message': 'User logged in successfully', 'access_token': access_token, 'role': role}), 200)
        else:
            return make_response(jsonify({'error': 'Invalid username or password'}), 401)

class Logout(Resource):
    def post(self):
        response = make_response(jsonify({'message': 'Logged out successfully'}))
        response.delete_cookie('token')
        return response

class ForgotPassword(Resource):
    def post(self):
        data = request.json
        email = data.get('email')
        user = User.query.filter_by(email=email).first()
        if user:
            reset_token = secrets.token_urlsafe(32)
            expires_at = datetime.utcnow() + timedelta(hours=1)  # Token expires in 1 hour
            reset_token_entry = ResetToken(user_id=user.user_id, token=reset_token, expires_at=expires_at)
            db.session.add(reset_token_entry)
            db.session.commit()
            msg = Message('Password Reset Request', sender=os.getenv('MAIL_USERNAME'), recipients=[user.email])
            msg.body = f"Your password reset token is: {reset_token}. It will expire in 1 hour."
            mail.send(msg)
            return make_response(jsonify({'message': 'Password reset token sent to your email'}), 200)
        else:
            return make_response(jsonify({'error': 'Email not found'}), 404)

class ResetPassword(Resource):
    def post(self):
        data = request.json
        token = data.get('token')
        new_password = data.get('new_password')
        confirm_password = data.get('confirm_password')
        if new_password != confirm_password:
            return make_response(jsonify({'error': 'Passwords do not match'}), 400)
        reset_token_entry = ResetToken.query.filter_by(token=token).first()
        if reset_token_entry:
            if datetime.utcnow() > reset_token_entry.expires_at:
                return make_response(jsonify({'error': 'Token has expired'}), 400)
            user = User.query.filter_by(user_id=reset_token_entry.user_id).first()
            user.password_hash = generate_password_hash(new_password, method='pbkdf:sha512')
            db.session.delete(reset_token_entry)
            db.session.commit()
            return make_response(jsonify({'message': 'Password has been reset successfully'}), 200)
        else:
            return make_response(jsonify({'error': 'Invalid or expired token'}), 400)
