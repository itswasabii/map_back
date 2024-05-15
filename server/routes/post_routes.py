from flask import jsonify,request
from flask_restful import Resource
from datetime import datetime

from models import db
from models.post_model import Post, Comment

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

