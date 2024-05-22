# routes.py

from flask import jsonify, request ,  make_response
from flask_restful import Resource
from models.fundraiser_model import db, Fundraiser, Donation

class DonationResource(Resource):
    def post(self):
        data = request.json
        fundraiser_id = data['fundraiser_id']
        user_id = data['user_id']
        amount = data['amount']
        
        # Find the fundraiser
        fundraiser = Fundraiser.query.get_or_404(fundraiser_id)
        
        # Create a new donation
        new_donation = Donation(
            fundraiser_id=fundraiser_id,
            user_id=user_id,
            amount=amount
        )
        
        # Update the current amount of the fundraiser
        fundraiser.current_amount += amount
        
        # Save the donation and update the fundraiser
        db.session.add(new_donation)
        db.session.commit()
        
        return make_response (jsonify({'message': 'Donation submitted successfully'}), 201)

    def get(self, donation_id):
        donation = Donation.query.get_or_404(donation_id)
        donation_data = {
            'id': donation.id,
            'fundraiser_id': donation.fundraiser_id,
            'user_id': donation.user_id,
            'amount': donation.amount,
            'donation_date': donation.donation_date.isoformat()
        }
        return make_response (jsonify(donation_data))

    def put(self, donation_id):
        data = request.json
        donation = Donation.query.get_or_404(donation_id)
        
        # Update donation information
        donation.amount = data.get('amount', donation.amount)
        db.session.commit()
        return make_response (jsonify({'message': 'Donation updated successfully'}))

    def delete(self, donation_id):
        donation = Donation.query.get_or_404(donation_id)
        db.session.delete(donation)
        db.session.commit()
        return make_response  (jsonify({'message': 'Donation deleted successfully'}))


# Add the DonationResource to your API
