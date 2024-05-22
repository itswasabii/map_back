from flask import jsonify, request
from flask_restful import Resource, reqparse
from flask import request
from datetime import datetime

from models import db
from models.user_model import User
from models.cohort_model import Cohort, CohortMember
from models.post_model import Post, Comment

  
class Home(Resource):
    def get(self):
        return {'message': 'Welcome to the backend of your application!'}
    

