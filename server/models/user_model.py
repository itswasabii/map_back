from . import  db, login_manager
from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

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
    # fundraiser_id = db.Column(db.Integer, db.ForeignKey('fundraiser.id'))
   
    # fundraiser = db.relationship('Fundraiser', backref='users')
    cohorts_created = db.relationship('Cohort', backref='cohort', lazy='dynamic')
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    comments = db.relationship('Comment', backref='author', lazy='dynamic')
    # fundraisers_created = db.relationship('Fundraiser', backref='creator', lazy='dynamic')
    # messages_sent = db.relationship('ChatMessage', backref='sender', lazy='dynamic')
    cohort_memberships = db.relationship('CohortMember', backref='member', lazy='dynamic')

    # notifications = db.relationship('Notification', backref='recipient', lazy='dynamic')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
