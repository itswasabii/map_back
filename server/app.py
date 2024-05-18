from flask import Flask, request, jsonify, make_response, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from flask_migrate import Migrate
from flask_cors import CORS  # Ensure CORS is imported
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
from datetime import datetime, timedelta
import os
import secrets
import jwt
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize SQLAlchemy and Mail without passing the app instance
db = SQLAlchemy()
mail = Mail()

def create_app():
    # Create Flask application instance
    app = Flask(__name__)

    # Configuration from environment variables
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

    # Use an absolute path for the SQLite database
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'instance', 'map.db')

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')

    # Initialize SQLAlchemy and Mail with Flask application
    db.init_app(app)
    mail.init_app(app)
    
    # Update CORS configuration to allow all endpoints from the specified origins
    CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://localhost:5173"]}}, supports_credentials=True)

    migrate = Migrate(app, db)

    # Models
    class User(db.Model):
        user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
        username = db.Column(db.String(255), unique=True, nullable=False)
        email = db.Column(db.String(255), unique=True, nullable=False)
        password_hash = db.Column(db.String(255), nullable=False)
        role = db.Column(db.Enum('admin', 'normal'), nullable=False)
        occupation = db.Column(db.String(255))
        qualifications = db.Column(db.Text)
        bio = db.Column(db.Text)
        location = db.Column(db.String(255))
        profile_picture_url = db.Column(db.String(255))
        joined_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    class ResetToken(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
        token = db.Column(db.String(100), unique=True, nullable=False)
        created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # Create the database tables
    with app.app_context():
        db.create_all()

    # JWT Secret Key from environment variable
    jwt_secret_key = os.getenv('JWT_SECRET_KEY')

    # Session dictionary
    my_session = dict()

    @app.before_request
    def check_if_logged_in():
        endpoint = request.endpoint
        if endpoint not in ['login', 'logout', 'register', 'forgot_password', 'reset_password', 'static']:
            auth_token = my_session.get('auth_token')
            if not auth_token:
                return make_response({'error': 'Unauthorized access, please login'}, 401)
            payload = decode_token(auth_token)
            if isinstance(payload, str):
                return make_response({'error': payload}, 401)

    def decode_token(token):
        try:
            payload = jwt.decode(token, jwt_secret_key, algorithms=["HS256"])
            return payload
        except jwt.ExpiredSignatureError:
            return "The token is expired, please login again"
        except jwt.InvalidTokenError:
            return "The token is invalid, please login again"

    @app.route('/register', methods=['POST'])
    def register():
        data = request.json
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        hashed_pass = generate_password_hash(password, method='pbkdf2:sha512')
        try:
            new_user = User(username=username, password_hash=hashed_pass, email=email, role='normal')
            db.session.add(new_user)
            db.session.commit()
            return make_response({'message': 'User has been registered'}, 200)
        except IntegrityError:
            return make_response({'error': 'Username or email already exists'}, 400)

    @app.route('/login', methods=['POST'])
    def login():
        data = request.json
        username = data.get('username')
        password = data.get('password')
        user = User.query.filter_by(username=username).first()
        if not user or not check_password_hash(user.password_hash, password):
            return make_response({'error': 'Invalid username or password'}, 401)
        expiration_time = datetime.utcnow() + timedelta(hours=3)
        token = jwt.encode({'user_id': user.user_id, 'exp': expiration_time}, jwt_secret_key, algorithm='HS256')
        my_session['auth_token'] = token
        my_session['user_id'] = user.user_id
        return make_response({'message': 'Login successful', 'token': token}, 200)

    @app.route('/logout', methods=['GET'])
    def logout():
        my_session.clear()
        return make_response({'message': 'User has been logged out'})

    @app.route('/forgot_password', methods=['POST'])
    def forgot_password():
        data = request.get_json()
        email = data.get('email')
        user = User.query.filter_by(email=email).first()
        if user:
            reset_token = secrets.token_urlsafe(32)
            reset_token_entry = ResetToken(user_id=user.user_id, token=reset_token)
            db.session.add(reset_token_entry)
            db.session.commit()
            msg = Message('Password Reset Request', sender=os.getenv('MAIL_USERNAME'), recipients=[user.email])
            msg.body = f"Click the following link to reset your password: http://localhost:5173/reset_password?token={reset_token}"
            mail.send(msg)
            return jsonify({'message': 'Password reset link sent to your email'}), 200
        else:
            return jsonify({'error': 'Email not found'}), 404

    @app.route('/reset_password', methods=['POST'])
    def reset_password():
        data = request.get_json()
        token = data.get('token')
        new_password = data.get('new_password')
        confirm_password = data.get('confirm_password')
        if new_password != confirm_password:
            return jsonify({'error': 'Passwords do not match'}), 400
        reset_token_entry = ResetToken.query.filter_by(token=token).first()
        if reset_token_entry:
            user = User.query.filter_by(user_id=reset_token_entry.user_id).first()
            user.password_hash = generate_password_hash(new_password, method='pbkdf2:sha512')
            db.session.delete(reset_token_entry)
            db.session.commit()
            return jsonify({'message': 'Password has been reset successfully'}), 200
        else:
            return jsonify({'error': 'Invalid or expired token'}), 400

    # Example of a protected route
    @app.route('/profile', methods=['GET'])
    def profile():
        auth_token = my_session.get('auth_token')
        payload = decode_token(auth_token)
        user = User.query.filter_by(user_id=payload['user_id']).first()
        return jsonify({
            'username': user.username,
            'email': user.email,
            'role': user.role,
            'occupation': user.occupation,
            'qualifications': user.qualifications,
            'bio': user.bio,
            'location': user.location,
            'profile_picture_url': user.profile_picture_url,
            'joined_at': user.joined_at
        })

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5555)
