from flask import jsonify,request, make_response
from flask_restful import Resource
from datetime import datetime

from models import db
from models.post_model import Post, Comment, PostCategory, Like, Share

class Posts(Resource):
    def get(self):
        posts = Post.query.all()
        posts_data = []
        for post in posts:
            post_data = {
                'post_user_id': post.user_id,
                'post_user_name': post.author.username,
                'category': post.category.value,
                'post_content': post.content,
                'comments_count': post.comments.count(),
                'likes_count': post.likes.count(),
                'shares_count': post.shares.count(),
                'the_comments': []
                }
            for comment in post.comments:
                comment_data = {
                    'comment_id': comment.comment_id,
                    'user_id': comment.user_id,
                    'user_name': comment.user_name,
                    'content': comment.content
                }
                post_data['the_comments'].append(comment_data)
            posts_data.append(post_data)
        return jsonify(posts_data)

    
    def post(self):
        data = request.json
        try:
            category = PostCategory[data['category'].upper()]  
        except KeyError:
            return jsonify({'error': 'Invalid category'}), 400
        new_post = Post(
            user_id=data['user_id'],
            cohort_id=data['cohort_id'],
            content=data['content'],
            category=category,
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
        if 'category' in data:
            try:
                post.category = PostCategory[data['category'].upper()] 
            except KeyError:
                return jsonify({'error': 'Invalid category'}), 400
        db.session.commit()
        return jsonify({'message': 'Post updated successfully'})

    
    def delete(self, post_id):
        post = Post.query.get_or_404(post_id)
        if post.user_id != request.json['user_id']:
            return jsonify({'error': 'You are not authorized to delete this post'}), 403
        db.session.delete(post)
        db.session.commit()
        return jsonify({'message': 'Post deleted successfully'})

class OnePost(Resource):
    def get(self, post_id):
        post = Post.query.get_or_404(post_id)
        post_data = {
            'post_id': post.post_id,
            'post_user_id': post.user_id,
            'post_user_name': post.author.username,
            'category': post.category.value,
            'post_content': post.content,
            'comments_count': post.comments.count(),
            'likes_count': post.likes.count(),
            'shares_count': post.shares.count(),
            'the_comments': []
        }
        for comment in post.comments:
            comment_data = {
                'comment_id': comment.comment_id,
                'user_id': comment.user_id,
                'user_name': comment.author.username,
                'content': comment.content
            }
            post_data['the_comments'].append(comment_data)
        return jsonify(post_data)


class Comments(Resource):
    def post(self, post_id):
        data = request.json
        new_comment = Comment(
            post_id=post_id,
            user_id=data['user_id'],
            user_name=data['user_name'],
            cohort_id=data.get('cohort_id'),
            content=data['content'],
            created_at=datetime.utcnow()
        )
        db.session.add(new_comment)
        db.session.commit()
        return jsonify(new_comment.serialize()), 201
    
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
    
class Likes(Resource):
    def post(self):
        data = request.json
        new_like = Like(
            user_id=data['user_id'],
            post_id=data['post_id'],
            created_at=datetime.utcnow()
        )
        db.session.add(new_like)
        db.session.commit()
        return jsonify({'message': 'Like added successfully'}), 201

class Shares(Resource):
    def post(self):
        data = request.json
        new_share = Share(
            user_id=data['user_id'],
            post_id=data['post_id'],
            created_at=datetime.utcnow()
        )
        db.session.add(new_share)
        db.session.commit()
        return jsonify({'message': 'Post shared successfully'}), 201