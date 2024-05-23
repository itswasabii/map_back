from flask import jsonify, request, make_response 
from flask_restful import Resource
from flask_mail import Message
from models import db
from models.cohort_model import Cohort
from models.post_model import Post
from models.user_model import User
from models.fundraiser_model import Fundraiser
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import mail
from datetime import datetime
import os

# Decorator to enforce admin-only access
def admin_required(func):
    @jwt_required()
    def wrapper(*args, **kwargs):
        identity = get_jwt_identity()  # Get JWT identity
        print(f"JWT Identity: {identity}")  # Debugging line to print the identity
        user_id = identity.get('user_id')  # Extract user_id from the identity
        user = User.query.get(user_id)  # Fetch the user from the database
        if not user or user.role != 'admin':  # Check if user is admin
            return make_response(jsonify({'message': 'Admin access required'}), 403)
        return func(*args, **kwargs)
    return wrapper

class CreateCohort(Resource):
    @admin_required
    def post(self):
        try:  # Added try-except block for error handling
            data = request.json
            new_cohort = Cohort(
                cohort_name=data['cohort_name'],
                created_by=data['created_by'],
                type=data['type'],
                year_of_enrollment=data['year_of_enrollment'],
                course_id=data['course_id']
            )
            db.session.add(new_cohort)
            db.session.commit()
            return make_response(jsonify({'message': 'Cohort created successfully'}), 201)
        except Exception as e:
            return make_response(jsonify({'error': str(e)}), 500)  # Error handling

class CreatePost(Resource):
    @admin_required
    def post(self):
        try:  # Added try-except block for error handling
            data = request.json
            new_post = Post(
                user_id=data['user_id'],
                cohort_id=data['cohort_id'],
                category=data['category'],
                content=data['content']
            )
            db.session.add(new_post)
            db.session.commit()
            return make_response(jsonify({'message': 'Post created successfully'}), 201)
        except Exception as e:
            return make_response(jsonify({'error': str(e)}), 500)  # Error handling

class ViewAllUsers(Resource):
    @admin_required
    def get(self):
        try:  # Added try-except block for error handling
            users = User.query.all()
            user_data = [{
                'user_id': user.user_id,
                'username': user.username,
                'email': user.email,
                'bio': user.bio,
                'occupation': user.occupation,
                'qualification': user.qualification,
                'location': user.location,
                'profile_picture_url': user.profile_picture_url,
                'joined_at': user.joined_at.isoformat()
            } for user in users]
            return make_response(jsonify(user_data), 200)
        except Exception as e:
            return make_response(jsonify({'error': str(e)}), 500)  # Error handling

class SendMassEmails(Resource):
    @admin_required
    def post(self):
        try:  # Added try-except block for error handling
            data = request.json
            users = User.query.all()
            sender_email = os.getenv('MAIL_USERNAME')
            for user in users:
                msg = Message(
                    subject=data['subject'],
                    sender=sender_email,
                    recipients=[user.email],
                    body=data['message']
                )
                mail.send(msg)
            return make_response(jsonify({'message': 'Emails sent successfully'}), 200)
        except Exception as e:
            return make_response(jsonify({'error': str(e)}), 500)  # Error handling
        
class CreateFundraiser(Resource):
    @admin_required
    def post(self):
        try:  # Added try-except block for error handling
            data = request.json

            # Convert end_date string to a datetime.date object
            end_date_str = data['end_date']
            end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()

            new_fundraiser = Fundraiser(
                user_id=data['user_id'],
                title=data['title'],
                description=data['description'],
                goal_amount=data['goal_amount'],
                end_date=end_date
            )
            db.session.add(new_fundraiser)
            db.session.commit()
            return make_response(jsonify({'message': 'Fundraiser created successfully'}), 201)
        except Exception as e:
            return make_response(jsonify({'error': str(e)}), 500)  # Error handling