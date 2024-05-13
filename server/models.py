from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from app import db, login_manager

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(UserMixin, db.Model):
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
    cohorts_created = db.relationship('Cohort', backref='creator', lazy='dynamic')
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    comments = db.relationship('Comment', backref='author', lazy='dynamic')
    notifications = db.relationship('Notification', backref='recipient', lazy='dynamic')
    fundraisers_created = db.relationship('Fundraiser', backref='creator', lazy='dynamic')
    messages_sent = db.relationship('ChatMessage', backref='sender', lazy='dynamic')
    cohort_memberships = db.relationship('CohortMember', backref='member', lazy='dynamic')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Cohort(db.Model):
    cohort_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cohort_name = db.Column(db.String(255), nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    members = db.relationship('CohortMember', backref='cohort', lazy='dynamic')
    posts = db.relationship('Post', backref='cohort', lazy='dynamic')
    fundraisers = db.relationship('Fundraiser', backref='cohort', lazy='dynamic')

class CohortMember(db.Model):
    member_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cohort_id = db.Column(db.Integer, db.ForeignKey('cohort.cohort_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    joined_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

class Post(db.Model):
    post_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    cohort_id = db.Column(db.Integer, db.ForeignKey('cohort.cohort_id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    comments = db.relationship('Comment', backref='post', lazy='dynamic')

class Comment(db.Model):
    comment_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    post_id = db.Column(db.Integer, db.ForeignKey('post.post_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    cohort_id = db.Column(db.Integer, db.ForeignKey('cohort.cohort_id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

class Notification(db.Model):
    notification_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    activity= db.Column(db.String(50), nullable=False)
    activity_id= db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    is_read = db.Column(db.Boolean, nullable=False, default=False)

class Fundraiser(db.Model):
    fundraiser_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cohort_id = db.Column(db.Integer, db.ForeignKey('cohort.cohort_id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    goal_amount = db.Column(db.Numeric(10, 2), nullable=False)
    current_amount = db.Column(db.Numeric(10, 2), nullable=False, default=0)
    created_by = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

class Advert(db.Model):
    advert_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

class AdminNotification(db.Model):
    admin_notification_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

class ChatMessage(db.Model):
    message_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    