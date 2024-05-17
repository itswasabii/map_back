from flask import Blueprint, request, jsonify
from .models import db, Notification, Cohort, Post, User

notifications_bp = Blueprint('notifications', __name__, url_prefix='/notifications')

@notifications_bp.route('/send', methods=['POST'])
def send_notification_route():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        message = data.get('message')
        if not user_id or not message:
            return jsonify({'error': 'Invalid input data'}), 400
        notification = Notification(user_id=user_id, message=message)
        db.session.add(notification)
        db.session.commit()
        return jsonify({'message': 'Notification sent successfully'}), 200
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'error': 'An error occurred while sending notification'}), 500

@notifications_bp.route('/<int:user_id>', methods=['GET'])
def get_notifications(user_id):
    try:
        notifications = Notification.query.filter_by(user_id=user_id).all()
        return jsonify([{
            'id': n.id,
            'message': n.message,
            'timestamp': n.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
            'is_read': n.is_read
        } for n in notifications]), 200
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'error': 'An error occurred while retrieving notifications'}), 500

@notifications_bp.route('/read/<int:notification_id>', methods=['PATCH'])
def read_notification(notification_id):
    try:
        notification = Notification.query.get(notification_id)
        if not notification:
            return jsonify({'error': 'Notification not found'}), 404
        notification.is_read = True
        db.session.commit()
        return jsonify({'message': 'Notification marked as read'}), 200
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'error': 'An error occurred while marking notification as read'}), 500

@notifications_bp.route('/cohorts/join', methods=['POST'])
def join_cohort():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        name = data.get('name')
        if not user_id or not name:
            return jsonify({'error': 'Invalid input data'}), 400
        new_cohort = Cohort(name=name, user_id=user_id)
        db.session.add(new_cohort)
        db.session.commit()
        message = "You have joined a new cohort"
        notification = Notification(user_id=user_id, message=message)
        db.session.add(notification)
        db.session.commit()
        return jsonify({'message': 'Joined cohort successfully'}), 200
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'error': 'An error occurred while joining cohort'}), 500

@notifications_bp.route('/posts', methods=['POST'])
def create_post():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        content = data.get('content')
        if not user_id or not content:
            return jsonify({'error': 'Invalid input data'}), 400
        new_post = Post(user_id=user_id, content=content)
        db.session.add(new_post)
        db.session.commit()
        return jsonify({'message': 'Post created successfully'}), 201
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'error': 'An error occurred while creating post'}), 500

def init_app(app):
    app.register_blueprint(notifications_bp)
