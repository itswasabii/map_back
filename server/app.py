from flask import Flask, request, jsonify, make_response
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_mail import Mail
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Initialize Flask application
app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///map.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.json.compact = False

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
api = Api(app)
mail = Mail(app)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://localhost:5173"]}}, supports_credentials=True)

# Import models
from models.user_model import User, ResetToken
from models import login_manager

# Initialize login manager
login_manager.init_app(app)

# Import routes
from routes import Home
from routes.donation_routes import DonationResource
from routes.user_routes import Users, Register, Login, Logout, ForgotPassword, ResetPassword
from routes.cohort_routes import Cohorts, CohortMembers
from routes.post_routes import Posts, Comments
from routes.fundraiser_routes import FundraiserResource

# Register resources with Flask-RESTful
api.add_resource(Home, '/')
api.add_resource(Users, '/users')
api.add_resource(Cohorts, '/cohorts')
api.add_resource(CohortMembers, '/cohort_members')
api.add_resource(Posts, '/posts')
api.add_resource(Comments, '/comments')
api.add_resource(DonationResource, '/donations/<int:donation_id>')
api.add_resource(FundraiserResource, '/fundraisers', '/fundraisers/<int:fundraiser_id>')

# Authentication and Authorization routes
api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(ForgotPassword, '/forgot_password')
api.add_resource(ResetPassword, '/reset_password')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
