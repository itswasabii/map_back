from flask import jsonify, request
from flask_restful import Resource
from models import db
from models.fundraiser_model import Donation

class DonationResource(Resource):
    def get(self, donation_id):
        donation = Donation.query.get_or_404(donation_id)
        donation_data = {
            'id': donation.id,
            'fundraiser_id': donation.fundraiser_id,
            'user_id': donation.user_id,
            'amount': donation.amount,
            'donation_date': donation.donation_date.isoformat()
        }
        return jsonify(donation_data)


    def put(self, donation_id):
        data = request.json
        donation = Donation.query.get_or_404(donation_id)
        
        # Update donation information
        donation.amount = data.get('amount', donation.amount)
        db.session.commit()
        return jsonify({'message': 'Donation updated successfully'})

    def delete(self, donation_id):
        donation = Donation.query.get_or_404(donation_id)
        db.session.delete(donation)
        db.session.commit()
        return jsonify({'message': 'Donation deleted successfully'})
