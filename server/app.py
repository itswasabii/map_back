# from flask import Flask, make_response, jsonify, request
# from flask_restful import Api, Resource
# from flask_sqlalchemy import SQLAlchemy
# from flask_login import LoginManager, login_user, logout_user, login_required, current_user
# from flask_mail import Mail, Message
# from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
# from werkzeug.security import generate_password_hash, check_password_hash
# from functools import wraps  # Import wraps for role_required decorator
# import datetime

# app = Flask(__name__)
# api = Api(app)
# db = SQLAlchemy(app)
# login_manager = LoginManager(app)
# mail = Mail(app)

# # Configuration
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
# app.config['SECRET_KEY'] = 'your_secret_key'
# app.config['MAIL_SERVER'] = 'smtp.example.com'
# app.config['MAIL_PORT'] = 587
# app.config['MAIL_USE_TLS'] = True
# app.config['MAIL_USERNAME'] = 'your_email@example.com'
# app.config['MAIL_PASSWORD'] = 'your_email_password'

# # User model
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     password_hash = db.Column(db.String(128))
#     role = db.Column(db.String(80), nullable=False, default='user')
#     reset_token = db.Column(db.String(128), nullable=True)
#     reset_token_expiration = db.Column(db.DateTime, nullable=True)

#     def __init__(self, username, email, password, role='user'):
#         self.username = username
#         self.email = email
#         self.password_hash = generate_password_hash(password)
#         self.role = role

#     def check_password(self, password):
#         return check_password_hash(self.password_hash, password)

#     def generate_reset_token(self, expiration=3600):
#         s = Serializer(app.config['SECRET_KEY'], expiration)
#         self.reset_token = s.dumps({'user_id': self.id}).decode('utf-8')
#         self.reset_token_expiration = datetime.datetime.now() + datetime.timedelta(seconds=expiration)
#         db.session.commit()

#     @staticmethod
#     def verify_reset_token(token):
#         s = Serializer(app.config['SECRET_KEY'])
#         try:
#             user_id = s.loads(token)['user_id']
#         except:
#             return None
#         return User.query.get(user_id)

# # User loader for Flask-Login
# @login_manager.user_loader
# def load_user(user_id):
#     return User.query.get(int(user_id))

# # Registration
# class RegisterUser(Resource):
#     def post(self):
#         data = request.get_json()
#         username = data.get('username')
#         email = data.get('email')
#         password = data.get('password')
#         role = data.get('role', 'user')

#         if not username or not email or not password:
#             return jsonify({"error": "Username, email, and password are required."}), 400

#         new_user = User(username=username, email=email, password=password, role=role)
#         db.session.add(new_user)
#         db.session.commit()

#         return make_response({"message": "User created successfully"}, 201)

# api.add_resource(RegisterUser, "/register")

# # Login
# class LoginUser(Resource):
#     def post(self):
#         data = request.get_json()
#         user = User.query.filter_by(email=data['email']).first()

#         if not user or not user.check_password(data['password']):
#             return make_response(jsonify({"error": "Invalid credentials"}), 401)

#         login_user(user)
#         return make_response(jsonify({"message": "Login successful"}), 200)

# api.add_resource(LoginUser, "/login")

# # Logout
# class LogoutUser(Resource):
#     @login_required
#     def post(self):
#         logout_user()
#         return make_response(jsonify({"message": "Logout successful"}), 200)

# api.add_resource(LogoutUser, "/logout")

# # Forgot Password
# class ForgotPassword(Resource):
#     def post(self):
#         data = request.get_json()
#         email = data.get('email')
#         user = User.query.filter_by(email=email).first()

#         if not user:
#             return make_response(jsonify({"error": "Email not found"}), 404)

#         user.generate_reset_token()
#         db.session.commit()

#         reset_url = f"{request.host_url}reset-password/{user.reset_token}"
#         msg = Message('Password Reset Request', recipients=[user.email])
#         msg.body = f"To reset your password, visit the following link: {reset_url}"
#         mail.send(msg)

#         return make_response(jsonify({"message": "Password reset link sent to your email"}), 200)

# api.add_resource(ForgotPassword, "/forgot-password")

# # Reset Password
# class ResetPassword(Resource):
#     def post(self, token):
#         user = User.verify_reset_token(token)

#         if not user:
#             return make_response(jsonify({"error": "Invalid or expired token"}), 403)

#         data = request.get_json()
#         new_password = data.get('password')

#         if not new_password:
#             return make_response(jsonify({"error": "Password is required"}), 400)

#         user.password_hash = generate_password_hash(new_password)
#         user.reset_token = None
#         user.reset_token_expiration = None
#         db.session.commit()

#         return make_response(jsonify({"message": "Password reset successful"}), 200)

# api.add_resource(ResetPassword, "/reset-password/<token>")

# # User Profile
# class UserProfile(Resource):
#     @login_required
#     def get(self):
#         user = current_user
#         return make_response(jsonify({
#             "username": user.username,
#             "email": user.email,
#             "role": user.role
#         }), 200)

#     @login_required
#     def put(self):
#         data = request.get_json()
#         user = current_user

#         if 'username' in data:
#             user.username = data['username']
#         if 'email' in data:
#             user.email = data['email']
#         if 'password' in data:
#             user.password_hash = generate_password_hash(data['password'])
#         if 'role' in data and user.role == 'admin':
#             user.role = data['role']

#         db.session.commit()
#         return make_response(jsonify({"message": "Profile updated successfully"}), 200)

# api.add_resource(UserProfile, "/profile")

# # Role-based access control decorator
# def role_required(role):
#     def decorator(func):
#         @wraps(func)
#         def wrapper(*args, **kwargs):
#             if current_user.role != role:
#                 return make_response(jsonify({"error": "Insufficient permissions"}), 403)
#             return func(*args, **kwargs)
#         return wrapper
#     return decorator

# # Protected Resource (accessible only to admins)
# class ProtectedResource(Resource):
#     @login_required
#     @role_required('admin')
#     def get(self):
#         return make_response(jsonify({"message": "This resource is protected for admins only"}), 200)

# api.add_resource(ProtectedResource, "/protected")

# # Create the database
# with app.app_context():
#     db.create_all()

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, jsonify, request, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_mail import Mail, Message
from itsdangerous import Serializer
from werkzeug.security import generate_password_hash, check_password_hash
# from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from functools import wraps
import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
app.config['SECRET_KEY'] = 'your_secret_key_here'
db = SQLAlchemy(app)
api = Api(app)
login_manager = LoginManager(app)
mail = Mail(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    role = db.Column(db.String(80), nullable=False, default='user')
    reset_token = db.Column(db.String(128), nullable=True)
    reset_token_expiration = db.Column(db.DateTime, nullable=True)

    def __init__(self, username, email, password, role='user'):
        self.username = username
        self.email = email
        self.password_hash = generate_password_hash(password)
        self.role = role

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_reset_token(self, expiration=3600):
        s = Serializer(app.config['SECRET_KEY'], expiration)
        self.reset_token = s.dumps({'user_id': self.id}).decode('utf-8')
        self.reset_token_expiration = datetime.datetime.now() + datetime.timedelta(seconds=expiration)
        db.session.commit()

    @staticmethod
    def verify_reset_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            user_id = s.loads(token)['user_id']
        except:
            return None
        return User.query.get(user_id)

class RegisterUser(Resource):
    def post():
        data = request.get_json()
        username, email, password, role = data.get('username'), data.get('email'), data.get('password'), data.get('role', 'user')
        if not all((username, email, password)):
            return {"error": "Username, email, and password are required."}, 400
        new_user = User(username=username, email=email, password=password, role=role)
        db.session.add(new_user)
        db.session.commit()
        return {"message": "User created successfully"}, 201

class LoginUser(Resource):
    def post():
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        if not user or not user.check_password(data['password']):
            return {"error": "Invalid credentials"}, 401
        login_user(user)
        return {"message": "Login successful"}, 200

class LogoutUser(Resource):
    @login_required
    def post():
        logout_user()
        return {"message": "Logout successful"}, 200

class ForgotPassword(Resource):
    def post():
        data = request.get_json()
        email = data.get('email')
        user = User.query.filter_by(email=email).first()
        if not user:
            return {"error": "Email not found"}, 404
        user.generate_reset_token()
        db.session.commit()
        reset_url = f"{request.host_url}reset-password/{user.reset_token}"
        msg = Message('Password Reset Request', recipients=[user.email], body=f"To reset your password, visit the following link: {reset_url}")
        mail.send(msg)
        return {"message": "Password reset link sent to your email"}, 200

class ResetPassword(Resource):
    def post(token):
        user = User.verify_reset_token(token)
        if not user:
            return {"error": "Invalid or expired token"}, 403
        new_password = request.get_json().get('password')
        if not new_password:
            return {"error": "Password is required"}, 400
        user.password_hash = generate_password_hash(new_password)
        user.reset_token = None
        user.reset_token_expiration = None
        db.session.commit()
        return {"message": "Password reset successful"}, 200

class UserProfile(Resource):
    @login_required
    def get():
        user = current_user
        return {"username": user.username, "email": user.email, "role": user.role}, 200

    @login_required
    def put():
        data = request.get_json()
        user = current_user
        for field in ('username', 'email', 'password'):
            if field in data:
                setattr(user, field, data[field])
        if 'role' in data and user.role == 'admin':
            user.role = data['role']
        db.session.commit()
        return {"message": "Profile updated successfully"}, 200

def role_required(role):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if current_user.role != role:
                return {"error": "Insufficient permissions"}, 403
            return func(*args, **kwargs)
        return wrapper
    return decorator

class ProtectedResource(Resource):
    @login_required
    @role_required('admin')
    def get():
        return {"message": "This resource is protected for admins only"}, 200

api.add_resource(RegisterUser, "/register")
api.add_resource(LoginUser, "/login")
api.add_resource(LogoutUser, "/logout")
api.add_resource(ForgotPassword, "/forgot-password")
api.add_resource(ResetPassword, "/reset-password/<token>")
api.add_resource(UserProfile, "/profile")
api.add_resource(ProtectedResource, "/protected")

if __name__ == "__main__":
    app.run(debug=True)
