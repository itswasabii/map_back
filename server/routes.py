from flask import jsonify, request
from flask_restful import Resource, reqparse
from flask import request
from datetime import datetime

from models import db
from models.user_model import User
from models.cohort_model import Cohort, CohortMember
from models.post_model import Post, Comment

class Home(Resource):
    def get(self):
        return {'message': 'Welcome to the backend of your application!'}
    
class Users(Resource):
    def get(self):
        users = User.query.all()
        user_data = [{'user_id': user.user_id, 'username': user.username} for user in users]
        return user_data

    def post(self):
        data = request.json
        new_user = User(
            username=data['username'],
            email=data['email'],
            password_hash=data['password_hash'],
            role=data['role'],
            joined_at=datetime.utcnow()
        )
        db.session.add(new_user)
        db.session.commit()
        return {'message': 'User created successfully'}, 201

class Cohorts(Resource):
    def get(self):
        cohorts = Cohort.query.all()
        cohort_data = []
        for cohort in cohorts:
            member_count = CohortMember.query.filter_by(cohort_id=cohort.cohort_id).count()
            # data for each cohort
            cohort_info = {
                'cohort_id': cohort.cohort_id,
                'cohort_name': cohort.cohort_name,
                'members': member_count 
            }
            cohort_data.append(cohort_info)
        return jsonify(cohort_data)

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('cohort_name', type=str, required=True)
        parser.add_argument('created_by', type=str, required=True)
        args = parser.parse_args()
        
        new_cohort = Cohort(
            cohort_name=args['cohort_name'],
            created_by=args['created_by'],
            created_at=datetime.utcnow()
        )
        db.session.add(new_cohort)
        db.session.commit()
        return jsonify({'message': 'Cohort created successfully'}), 201
    
    def delete(self, cohort_id):
        cohort = Cohort.query.get_or_404(cohort_id)
        
        db.session.delete(cohort)
        db.session.commit()
        
        return jsonify({'message': 'Cohort deleted successfully'})

    def put(self,cohort_id):
        parser = reqparse.RequestParser()
        parser.add_argument('cohort_name', type=str)
        parser.add_argument('created_by', type=str)
        parser.add_argument('created_at', type=str)
        args = parser.parse_args()

        cohort = Cohort.query.get_or_404(cohort_id)
        
        if args.get('cohort_name'):
            cohort.cohort_name = args['cohort_name']
        if args.get('created_by'):
            cohort.created_by = args['created_by']
        if args.get('created_at'):
            cohort.created_at = args['created_at']

        db.session.commit()
        
        return jsonify({'message': 'Cohort updated successfully', 'cohort': cohort.serialize()})

class CohortMembers(Resource):
    def get(self):
        cohort_members = CohortMember.query.all()
        cohort_member_data = [
            {
                'member_id': member.member_id,
                'cohort_id': member.cohort_id,
                'user_id': member.user_id,
                'joined_at': member.joined_at.strftime('%Y-%m-%dT%H:%M:%S')
            }
            for member in cohort_members
        ]
        return jsonify(cohort_member_data)

    def get_one(self, member_id):
        cohort_member = CohortMember.query.get_or_404(member_id)
        return jsonify({
            'member_id': cohort_member.member_id,
            'cohort_id': cohort_member.cohort_id,
            'user_id': cohort_member.user_id,
            'joined_at': cohort_member.joined_at.strftime('%Y-%m-%dT%H:%M:%S')
        })

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('cohort_id', type=int, required=True)
        parser.add_argument('user_id', type=int, required=True)
        args = parser.parse_args()

        new_member = CohortMember(cohort_id=args['cohort_id'], user_id=args['user_id'])
        db.session.add(new_member)
        db.session.commit()
        return jsonify({'message': 'Cohort member created successfully'}), 201

    def put(self, member_id):
        parser = reqparse.RequestParser()
        parser.add_argument('cohort_id', type=int)
        parser.add_argument('user_id', type=int)
        args = parser.parse_args()
        
        cohort_member = CohortMember.query.get_or_404(member_id)
        cohort_member.cohort_id = args.get('cohort_id', cohort_member.cohort_id)
        cohort_member.user_id = args.get('user_id', cohort_member.user_id)
        db.session.commit()
        return jsonify({'message': 'Cohort member updated successfully'})

    def delete(self, member_id):
        cohort_member = CohortMember.query.get_or_404(member_id)
        db.session.delete(cohort_member)
        db.session.commit()
        return jsonify({'message': 'Cohort member deleted successfully'})

class Posts(Resource):
    def get(self):
        posts = Post.query.all()
        posts_data = []
        for post in posts:
            post_data = {
                'post_user_id': post.user_id,
                'post_content': post.content,
                'the_comments': []
                }
            for comment in post.comments:
                comment_data = {
                    'user_id': comment.user_id,
                    'content': comment.content
                }
                post_data['the_comments'].append(comment_data)
            posts_data.append(post_data)
        return jsonify(posts_data)

    
    def post(self):
        data = request.json
        new_post = Post(
            user_id=data['user_id'],
            cohort_id=data['cohort_id'],
            content=data['content'],
            created_at=datetime.utcnow()
        )
        db.session.add(new_post)
        db.session.commit()
        return jsonify({'message': 'Post created successfully'}), 201

    
    def put(self, post_id):
        data = request.json
        post = Post.query.get_or_404(post_id)
        if post.user_id != data['user_id']:
            return jsonify({'error': 'You are not authorized to update this post'}), 403
        post.content = data['content']
        db.session.commit()
        return jsonify({'message': 'Post updated successfully'})

    
    def delete(self, post_id):
        post = Post.query.get_or_404(post_id)
        if post.user_id != request.json['user_id']:
            return jsonify({'error': 'You are not authorized to delete this post'}), 403
        db.session.delete(post)
        db.session.commit()
        return jsonify({'message': 'Post deleted successfully'})

class Comments(Resource):  
    def post():
        data = request.json
        new_comment = Comment(
            user_id=data['user_id'],
            post_id=data['post_id'],
            cohort_id=data['cohort_id'],
            content=data['content'],
            created_at=datetime.utcnow()
        )
        db.session.add(new_comment)
        db.session.commit()
        return jsonify({'message': 'Comment created successfully'}), 201

    def put(self, comment_id):
        data = request.json
        comment = Comment.query.get_or_404(comment_id)
        if comment.user_id != data['user_id']:
            return jsonify({'error': 'You are not authorized to update this comment'}), 403
        comment.content = data['content']
        db.session.commit()
        return jsonify({'message': 'Comment updated successfully'})

    def delete(self, comment_id):
        comment = Comment.query.get_or_404(comment_id)
        if comment.user_id != request.json['user_id']:
            return jsonify({'error': 'You are not authorized to delete this comment'}), 403
        db.session.delete(comment)
        db.session.commit()
        return jsonify({'message': 'Comment deleted successfully'})

