from . import  db
from datetime import datetime
from enum import Enum
from sqlalchemy import Enum as SqlEnum
from sqlalchemy_serializer import SerializerMixin

class SuccessStory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class TechNews(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    url = db.Column(db.String(255), nullable=True)
    created_by = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class PostCategory(Enum):
    SUCCESS_STORY = "success_story"
    TECH_NEWS = "tech_news"
    GENERAL_DISCUSSION = "general_discussion"

class Post(db.Model):
    post_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    cohort_id = db.Column(db.Integer, db.ForeignKey('cohort.cohort_id'), nullable=False)
    category = db.Column(SqlEnum(PostCategory), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    likes_count = db.Column(db.Integer, default=0)
    comments_count = db.Column(db.Integer, default=0)
    shares_count = db.Column(db.Integer, default=0)

    comments = db.relationship('Comment', backref='post', lazy='dynamic')
    likes= db.relationship('Like', backref='post', lazy='dynamic')
    shares= db.relationship('Share', backref='post', lazy='dynamic')

    def __init__(self, **kwargs):
        super(Post, self).__init__(**kwargs)
        self.likes_count = 0
        self.comments_count = 0
        self.shares_count = 0

    def __repr__(self):
        return f'<Post {self.post_id}>'

class Comment(db.Model):
    comment_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    post_id = db.Column(db.Integer, db.ForeignKey('post.post_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    user_name = db.Column(db.String(255), nullable=False)
    cohort_id = db.Column(db.Integer, db.ForeignKey('cohort.cohort_id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

class Like(db.Model):
    like_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.post_id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f'<Like {self.like_id}>'

class Share(db.Model):
    share_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.post_id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):

        return f'<Share {self.share_id}>'

