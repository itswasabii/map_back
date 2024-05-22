# models/user_model.py
from . import db
from datetime import datetime, timedelta
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

user_course_association = db.Table('user_course_association',
    db.Column('user_id', db.Integer, db.ForeignKey('user.user_id')),
    db.Column('course_id', db.Integer, db.ForeignKey('course.course_id'))
)

class User(UserMixin, db.Model, SerializerMixin):
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String(255), unique=True, nullable=False)
    cohort_id = db.Column(db.Integer, db.ForeignKey('cohort.cohort_id'))
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.Text)
    occupation = db.Column(db.String(50))
    qualification = db.Column(db.Text)
    location = db.Column(db.String(50))
    profile_picture_url = db.Column(db.String(255))
    joined_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    posts = db.relationship('Post', backref='author', lazy='dynamic')
    comments = db.relationship('Comment', backref='author', lazy='dynamic')
    cohort_memberships = db.relationship('CohortMember', backref='member', lazy='dynamic')
    courses = db.relationship('Course', secondary='user_course_association', backref='users')

    serialize_rules = ('-password_hash', '-comments.author.password_hash', '-posts.author.password_hash', '-cohort_memberships.member.password_hash')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'

class ResetToken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    token = db.Column(db.String(255), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False, default=lambda: datetime.utcnow() + timedelta(hours=1))

    user = db.relationship('User', backref=db.backref('reset_tokens', lazy=True))
