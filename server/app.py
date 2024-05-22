from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS
from flask_mail import Mail
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os
import logging

from routes import Home
from routes.donation_routes import DonationResource
from routes.user_routes import Users, Register, Login, Logout, ForgotPassword, ResetPassword, UserProfile
from routes.cohort_routes import Cohorts, CohortMembers
from routes.post_routes import Posts, Comments, Likes, Shares, OnePost
from routes.fundraiser_routes import FundraiserResource
from models import db, login_manager

# Load environment variables from .env file
load_dotenv()

# Initialize Flask application
app = Flask(__name__)
CORS(app)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///map.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAIL_SERVER'] = 'smtp.mailtrap.io'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.json.compact = False

# Debugging SMTP credentials
print(f"MAIL_USERNAME: {os.getenv('MAIL_USERNAME')}")
print(f"MAIL_PASSWORD: {os.getenv('MAIL_PASSWORD')}")

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
mail = Mail(app)
jwt = JWTManager(app)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173"]}}, supports_credentials=True)

# Initialize login manager
login_manager.init_app(app)

# Register resources with Flask-RESTful
api.add_resource(Home, '/')
api.add_resource(Users, '/users')
api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(ForgotPassword, '/forgot_password')
api.add_resource(ResetPassword, '/reset_password')
api.add_resource(UserProfile, '/users/<int:user_id>')
api.add_resource(Cohorts, '/cohorts')
api.add_resource(CohortMembers, '/cohort_members')
api.add_resource(Posts, '/posts', '/posts/<int:post_id>')
api.add_resource(OnePost, '/post/<int:post_id>')
api.add_resource(Comments, '/comments/<int:post_id>', '/comments/<int:comment_id>')
api.add_resource(Likes, '/likes')
api.add_resource(Shares, '/shares')
api.add_resource(FundraiserResource, '/fundraisers', '/fundraisers/<int:fundraiser_id>')
api.add_resource(DonationResource, '/api/donations', '/api/donations/<int:donation_id>')

# Create the database tables on launch
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(port=5555, debug=True)
