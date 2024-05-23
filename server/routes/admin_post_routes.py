from flask import jsonify, request
from flask_restful import Resource
from datetime import datetime
from models import db
from models.post_model import Post, PostCategory

class AdminPost(Resource):
    def post(self):
        data = request.json
        user_id = data.get('user_id')
        content = data.get('content')
        category = data.get('category')

        if not user_id or not content or not category:
            return jsonify({'error': 'Missing required fields'}), 400

        if category not in [category.value for category in PostCategory]:
            return jsonify({'error': 'Invalid category'}), 400

        new_post = Post(
            user_id=user_id,
            content=content,
            category=category,
            created_at=datetime.utcnow()
        )

        db.session.add(new_post)
        db.session.commit()

        return jsonify({'message': 'Post created successfully', 'post_id': new_post.post_id}), 201
