from flask import jsonify, request
from flask_restful import Api, Resource
# from .models import User, Cohort, Post, Comment, CohortMember
# from models.user_model import User 
# from models.cohort_model import Cohort, CohortMember
# from models.post_model import Post, Comment
from user_routes import Users
from cohort_routes import Cohorts, CohortMembers
from post_routes import Posts, Comments

  
class Home(Resource):
    def get(self):
        return {'message': 'Welcome to the backend of your application!'}
    

