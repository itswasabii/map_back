from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from models import db
from models.user_model import User
from models.fundraiser_model import Fundraiser

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/admin/fundraisers', methods=['POST'])
@jwt_required()
def create_fundraiser():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if current_user is None or current_user.role != 'admin':
        return jsonify({'message': 'Admin access required'}), 403

    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    goal_amount = data.get('goal_amount')
    cohort_id = data.get('cohort_id')

    if not title or not goal_amount or not cohort_id:
        return jsonify({'message': 'Missing required fields'}), 400

    new_fundraiser = Fundraiser(
        title=title,
        description=description,
        goal_amount=goal_amount,
        current_amount=0,
        created_by=current_user_id,
        cohort_id=cohort_id,
        created_at=datetime.utcnow()
    )

    db.session.add(new_fundraiser)
    db.session.commit()

    return jsonify({'message': 'Fundraiser created successfully'}), 201
