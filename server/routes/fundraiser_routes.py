from flask import jsonify, request
from flask.views import MethodView
from models import db
from models.fundraiser_model import Fundraiser

class FundraiserAPI(MethodView):
    def get(self, fundraiser_id=None):
        if fundraiser_id is None:
            # Get all fundraisers
            fundraisers = Fundraiser.query.all()
            fundraisers_data = [{
                'id': fundraiser.id,
                'user_id': fundraiser.user_id,
                'title': fundraiser.title,
                'description': fundraiser.description,
                'goal_amount': fundraiser.goal_amount,
                'current_amount': fundraiser.current_amount,
                'start_date': fundraiser.start_date.isoformat(),
                'end_date': fundraiser.end_date.isoformat(),
                'created_at': fundraiser.created_at.isoformat(),
                'updated_at': fundraiser.updated_at.isoformat()
            } for fundraiser in fundraisers]
            return jsonify(fundraisers_data)
        else:
            # Get a specific fundraiser
            fundraiser = Fundraiser.query.get_or_404(fundraiser_id)
            fundraiser_data = {
                'id': fundraiser.id,
                'user_id': fundraiser.user_id,
                'title': fundraiser.title,
                'description': fundraiser.description,
                'goal_amount': fundraiser.goal_amount,
                'current_amount': fundraiser.current_amount,
                'start_date': fundraiser.start_date.isoformat(),
                'end_date': fundraiser.end_date.isoformat(),
                'created_at': fundraiser.created_at.isoformat(),
                'updated_at': fundraiser.updated_at.isoformat()
            }
            return jsonify(fundraiser_data)

    def post(self):
        data = request.json
        new_fundraiser = Fundraiser(
            user_id=data['user_id'],
            title=data['title'],
            description=data['description'],
            goal_amount=data['goal_amount'],
            end_date=data['end_date']
        )
        db.session.add(new_fundraiser)
        db.session.commit()
        return jsonify({'message': 'Fundraiser created successfully', 'fundraiser_id': new_fundraiser.id}), 201

    def put(self, fundraiser_id):
        data = request.json
        fundraiser = Fundraiser.query.get_or_404(fundraiser_id)
        fundraiser.user_id = data['user_id']
        fundraiser.title = data['title']
        fundraiser.description = data['description']
        fundraiser.goal_amount = data['goal_amount']
        fundraiser.end_date = data['end_date']
        db.session.commit()
        return jsonify({'message': 'Fundraiser updated successfully'})

    def delete(self, fundraiser_id):
        fundraiser = Fundraiser.query.get_or_404(fundraiser_id)
        db.session.delete(fundraiser)
        db.session.commit()
        return jsonify({'message': 'Fundraiser deleted successfully'})

fundraiser_view = FundraiserAPI.as_view('fundraiser_api')
