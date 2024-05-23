from flask import jsonify
from flask_restful import Resource
from models import db
from models.user_model import User
from models.cohort_model import Cohort, CohortMember
from models.post_model import Post, Comment
from routes.admin_post_routes import AdminPost  # Import AdminPost

class Home(Resource):
    def get(self):
        return {'message': 'Welcome to the backend of your application!'}
