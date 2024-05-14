from flask import Blueprint, jsonify, request
from .models import User, Cohort, Post, Comment, CohortMember
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from .models import db  


# Create a Blueprint object
bp = Blueprint('routes', __name__)

@bp.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Welcome to the backend of your application!'})

@bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_data = [{'user_id': user.user_id, 'username': user.username} for user in users]
    return jsonify(user_data)


@bp.route('/users', methods=['POST'])
def create_user():
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
    return jsonify({'message': 'User created successfully'}), 201


@bp.route('/cohorts', methods=['GET'])
def get_cohorts():
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

@bp.route('/cohorts', methods=['POST'])
def create_cohort():
    data = request.json
    new_cohort = Cohort(
        cohort_name=data['cohort_name'],
        created_by=data['created_by'],
        created_at=datetime.utcnow()
    )
    db.session.add(new_cohort)
    db.session.commit()
    return jsonify({'message': 'Cohort created successfully'}), 201

@bp.route('/cohorts/<int:cohort_id>', methods=['DELETE'])
def delete_cohort(cohort_id):
    cohort = Cohort.query.get_or_404(cohort_id)
    
    db.session.delete(cohort)
    db.session.commit()
    
    return jsonify({'message': 'Cohort deleted successfully'})

@bp.route('/cohorts/<int:cohort_id>', methods=['PUT'])
def update_cohort(cohort_id):
    cohort = Cohort.query.get_or_404(cohort_id)

    data = request.json
    
    if 'cohort_name' in data:
        cohort.cohort_name = data['cohort_name']
    if 'created_by' in data:
        cohort.created_by = data['created_by']
    if 'created_at' in data:
        cohort.created_at = data['created_at']

    db.session.commit()
    
    return jsonify({'message': 'Cohort updated successfully', 'cohort': cohort.serialize()})

@bp.route('/cohort_members', methods=['GET'])
def get_cohort_members():
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

@bp.route('/cohort_members/<int:member_id>', methods=['GET'])
def get_cohort_member(member_id):
    cohort_member = CohortMember.query.get_or_404(member_id)
    return jsonify({
        'member_id': cohort_member.member_id,
        'cohort_id': cohort_member.cohort_id,
        'user_id': cohort_member.user_id,
        'joined_at': cohort_member.joined_at.strftime('%Y-%m-%dT%H:%M:%S')
    })

@bp.route('/cohort_members', methods=['POST'])
def create_cohort_member():
    data = request.json
    new_member = CohortMember(cohort_id=data['cohort_id'], user_id=data['user_id'])
    db.session.add(new_member)
    db.session.commit()
    return jsonify({'message': 'Cohort member created successfully'}), 201

@bp.route('/cohort_members/<int:member_id>', methods=['PUT'])
def update_cohort_member(member_id):
    cohort_member = CohortMember.query.get_or_404(member_id)
    data = request.json
    cohort_member.cohort_id = data.get('cohort_id', cohort_member.cohort_id)
    cohort_member.user_id = data.get('user_id', cohort_member.user_id)
    db.session.commit()
    return jsonify({'message': 'Cohort member updated successfully'})

@bp.route('/cohort_members/<int:member_id>', methods=['DELETE'])
def delete_cohort_member(member_id):
    cohort_member = CohortMember.query.get_or_404(member_id)
    db.session.delete(cohort_member)
    db.session.commit()
    return jsonify({'message': 'Cohort member deleted successfully'})

@bp.route('/posts', methods=['GET'])
def get_posts_with_comments():
    posts = Post.query.all()
    posts_data = []
    for post in posts:
        post_data = {
            'user_id': post.user_id,
            'content': {
                'post_content': post.content,
                'comments': []
            }
        }
        for comment in post.comments:
            comment_data = {
                'user_id': comment.user_id,
                'content': comment.content
            }
            post_data['content']['comments'].append(comment_data)
        posts_data.append(post_data)
    return jsonify(posts_data)

@bp.route('/posts', methods=['POST'])
def create_post():
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

@bp.route('/posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    data = request.json
    post = Post.query.get_or_404(post_id)
    if post.user_id != data['user_id']:
        return jsonify({'error': 'You are not authorized to update this post'}), 403
    post.content = data['content']
    db.session.commit()
    return jsonify({'message': 'Post updated successfully'})

@bp.route('/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.user_id != request.json['user_id']:
        return jsonify({'error': 'You are not authorized to delete this post'}), 403
    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted successfully'})

@bp.route('/comments', methods=['POST'])
def create_comment():
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

@bp.route('/comments/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    data = request.json
    comment = Comment.query.get_or_404(comment_id)
    if comment.user_id != data['user_id']:
        return jsonify({'error': 'You are not authorized to update this comment'}), 403
    comment.content = data['content']
    db.session.commit()
    return jsonify({'message': 'Comment updated successfully'})

@bp.route('/comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    if comment.user_id != request.json['user_id']:
        return jsonify({'error': 'You are not authorized to delete this comment'}), 403
    db.session.delete(comment)
    db.session.commit()
    return jsonify({'message': 'Comment deleted successfully'})

