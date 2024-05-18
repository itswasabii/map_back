from . import  db, login_manager
from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.ext.associationproxy import association_proxy
<<<<<<< HEAD
from sqlalchemy_serializer import SerializerMixin
=======
>>>>>>> 7544fdc9 (feat: add username to posts and course to user)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

user_course_association = db.Table('user_course_association',
    db.Column('user_id', db.Integer, db.ForeignKey('user.user_id')),
    db.Column('course_id', db.Integer, db.ForeignKey('course.course_id'))
)

<<<<<<< HEAD
class User(UserMixin, db.Model, SerializerMixin):
=======
class User(UserMixin, db.Model):
>>>>>>> 7544fdc9 (feat: add username to posts and course to user)
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    # role = db.Column(db.Enum('admin', 'normal'), nullable=False)
    bio = db.Column(db.Text)
<<<<<<< HEAD
    occupation = db.Column(db.String(50))
    qualification = db.Column(db.Text)
    location = db.Column(db.String(50))
=======
    # course_id= db.Column(db.Integer,db.ForeignKey('course.course_id'), nullable=False)
>>>>>>> 7544fdc9 (feat: add username to posts and course to user)
    # profile_picture_url = db.Column(db.String(255)) #Gichia
    joined_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # fundraiser_id = db.Column(db.Integer, db.ForeignKey('fundraiser.id'))
    # fundraiser = db.relationship('Fundraiser', backref='users')
   
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    comments = db.relationship('Comment', backref='author', lazy='dynamic')
    cohort_memberships = db.relationship('CohortMember', backref='member', lazy='dynamic')
    courses = db.relationship('Course', secondary='user_course_association', backref='users')
<<<<<<< HEAD

    serialize_rules = ('-password_hash', '-comments.author.password_hash', '-posts.author.password_hash', '-cohort_memberships.member.password_hash')
=======
>>>>>>> 7544fdc9 (feat: add username to posts and course to user)

    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    def __repr__(self):
        return f'<User {self.username}>'
