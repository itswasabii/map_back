import logging
from flask_restful import Resource
from flask import  request, jsonify, make_response
from models import db
from models.user_model import User, ResetToken
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
import secrets
import jwt
import os
from flask_mail import Mail, Message
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

jwt_secret_key = os.getenv('JWT_SECRET_KEY')
mail = Mail()


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
        return user_data, 200

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
        course = course.query.filter_by(course_name=course_name).first()
        if course:
            new_user.courses.append(course)
            db.session.commit()
            return {'message': 'User created and associated with the course successfully'}, 201
        else:
            return {'error': f'Course "{course_name}" not found'}, 404

    def put(self, user_id):
        data = request.json
        user = User.query.get_or_404(user_id)
        user.bio = data.get('bio', user.bio)
        user.occupation = data.get('occupation', user.occupation)
        user.qualification = data.get('qualification', user.qualification)
        user.location = data.get('location', user.location)
        db.session.commit()
        return {'message': 'User profile updated successfully'}, 200

class Register(Resource):
    def post(self):
        data = request.json
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        hashed_pass = generate_password_hash(password, method='pbkdf2:sha512')
        try:
            new_user = User(username=username, password_hash=hashed_pass, email=email, bio='', occupation='', qualification='', location='', joined_at=datetime.utcnow())
            db.session.add(new_user)
            db.session.commit()
            return make_response({'message': 'User has been registered'}, 200)
        except IntegrityError:
            db.session.rollback()
            return make_response({'error': 'Username or email already exists'}, 400)

class Login(Resource):
    def post(self):
        data = request.json
        username = data.get('username')
        password = data.get('password')
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password_hash, password):
            token = jwt.encode({
                'user_id': user.user_id,
                'exp': datetime.utcnow() + timedelta(hours=24)
            }, jwt_secret_key)
            response = make_response({'message': 'User logged in successfully', 'token': token})
            response.set_cookie('token', token, httponly=True, max_age=24*60*60)
            return response
        else:
            return make_response({'error': 'Invalid username or password'}, 401)

class Logout(Resource):
    def post(self):
        response = make_response({'message': 'Logged out successfully'})
        response.delete_cookie('token')
        return response


class ForgotPassword(Resource):
    def post(self):
        data = request.json
        email = data.get('email')
        
        if not email:
            return make_response(jsonify({'error': 'Email is required'}), 400)
        
        user = User.query.filter_by(email=email).first()
        
        if user:
            try:
                reset_token = secrets.token_urlsafe(32)
                reset_token_entry = ResetToken(user_id=user.user_id, token=reset_token)
                db.session.add(reset_token_entry)
                db.session.commit()
                
                reset_link = f"http://localhost:5173/reset_password?token={reset_token}"
                
                # Plain text message
                text_body = f"Click the following link to reset your password: {reset_link}"
                
                # HTML message
                html_body = f"<p>Click the following link to reset your password:</p> <a href='{reset_link}'>{reset_link}</a>"
                
                msg = Message('Password Reset Request',
                              sender=os.getenv('MAIL_USERNAME'),
                              recipients=[user.email])
                
                # Set both plain text and HTML body
                msg.body = text_body
                msg.html = html_body
                
                mail.send(msg)
                
                return make_response(jsonify({'message': 'Password reset link sent to your email'}), 200)
            except Exception as e:
                logger.error(f"Error sending password reset email: {e}")
                db.session.rollback()
                return make_response(jsonify({'error': 'An error occurred while sending the email. Please try again later.'}), 500)
        else:
            return make_response(jsonify({'error': 'Email not found'}), 404)

class ResetPassword(Resource):
    def post(self):
        data = request.json
        token = data.get('token')
        new_password = data.get('new_password')
        confirm_password = data.get('confirm_password')
        if new_password != confirm_password:
            return make_response ( jsonify({'error': 'Passwords do not match'}), 400)
        reset_token_entry = ResetToken.query.filter_by(token=token).first()
        if reset_token_entry:
            user = User.query.filter_by(user_id=reset_token_entry.user_id).first()
            user.password_hash = generate_password_hash(new_password, method='pbkdf2:sha512')
            db.session.delete(reset_token_entry)
            db.session.commit()
            return make_response(jsonify({'message': 'Password has been reset successfully'}), 200)
        else:
            return make_response(jsonify({'error': 'Invalid or expired token'}), 400)
