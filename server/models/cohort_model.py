from . import  db
from datetime import datetime

class Cohort(db.Model):
    cohort_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cohort_name = db.Column(db.String(255), nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    members = db.relationship('CohortMember', backref='cohort', lazy='dynamic')
    posts = db.relationship('Post', backref='cohort', lazy='dynamic')
    # fundraisers = db.relationship('Fundraiser', backref='cohort', lazy='dynamic')

class CohortMember(db.Model):
    member_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cohort_id = db.Column(db.Integer, db.ForeignKey('cohort.cohort_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    joined_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
