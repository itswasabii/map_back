from . import  db
from datetime import datetime
from enum import Enum
from sqlalchemy_serializer import SerializerMixin

class CohortType(Enum):
    PUBLIC = "public"
    PRIVATE = "private"


class Course(db.Model, SerializerMixin ):
    course_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    course_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f'<Course {self.course_name}>'
  

class Cohort(db.Model, SerializerMixin):
    cohort_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cohort_name = db.Column(db.String(255), nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    description = db.Column(db.Text, nullable=True)
    type = db.Column(db.Enum(CohortType), nullable=False)
    year_of_enrollment = db.Column(db.Integer, nullable=True) 
    course_id = db.Column(db.Integer, db.ForeignKey('course.course_id'), nullable=True)

    members = db.relationship('CohortMember', backref='cohort', lazy='dynamic')
    posts = db.relationship('Post', backref='cohort', lazy='dynamic')
    # fundraisers = db.relationship('Fundraiser', backref='cohort', lazy='dynamic')
    serialize_rules = ('-description', '-year_of_enrollment', 'course_id', 'members.cohort_id')
  

class CohortMember(db.Model):
    member_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cohort_id = db.Column(db.Integer, db.ForeignKey('cohort.cohort_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    joined_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
