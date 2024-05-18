from flask_restful import Resource
from flask import request
from models import db
from models.user_model import User
from models.cohort_model import Course

from datetime import datetime


def serialize_datetime(dt):
    if dt is None:
        return None
    return dt.isoformat()

class Users(Resource):
    def get(self):
        users = User.query.all()
        user_data = []
        for user in users:
            user_dict= {
                'user_id': user.user_id,
                'username': user.username,
                'email': user.email,
                'bio': user.bio,
                'occupation': user.occupation,
                'qualification':user.qualification,
                'location':user.location,
                # 'role':user.role,
                'cohorts': [
                    {
                        'cohort_id': member.cohort.cohort_id,
                        'cohort_name': member.cohort.cohort_name,
                    } for member in user.cohort_memberships
                ],
                
                'course': [course.course_name for course in user.courses],
                'joined_at': serialize_datetime(user.joined_at),
                'posts': [
                    {                       
                        'content': post.content,
                        'created_at':  serialize_datetime(post.created_at),
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
            password_hash=data['password_hash'],\
            # role=data['role'],
            bio=data['bio'],            
            joined_at=datetime.utcnow()
        )

        db.session.add(new_user)
        db.session.commit()
        course_name = data['course']
        course = Course.query.filter_by(course_name=course_name).first()
        if course:
            # Associate the user with the course
            new_user.courses.append(course)
            db.session.commit()
            return {'message': 'User created and associated with the course successfully'}, 201
        else:
            return {'error': f'Course "{course_name}" not found'}, 404

  
