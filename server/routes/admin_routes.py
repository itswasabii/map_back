from flask import Blueprint, jsonify, request, abort
from models import User, Fundraiser, db
from datetime import datetime

admin_bp = Blueprint('admin_routes', __name__)

# Route: Admin - Create a new fundraiser
@admin_bp.route('/admin/fundraisers', methods=['POST'])
def admin_create_fundraiser():
    data = request.json
    user = User.query.get(data['created_by'])
    
    if not user or user.role != 'admin':
        abort(403, description="Access forbidden: Admins only")
    
    new_fundraiser = Fundraiser(
        cohort_id=data['cohort_id'],
        title=data['title'],
        description=data.get('description', ''),
        goal_amount=data['goal_amount'],
        created_by=data['created_by'],
        created_at=datetime.utcnow()
    )
    
    db.session.add(new_fundraiser)
    db.session.commit()
    return jsonify({'message': 'Fundraiser created successfully'}), 201
