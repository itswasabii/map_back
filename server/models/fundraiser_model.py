from . import db
from datetime import datetime

class Fundraiser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    goal_amount = db.Column(db.Float, nullable=False)
    current_amount = db.Column(db.Float, nullable=False, default=0.0)
    start_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    end_date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Define relationship to user
    user = db.relationship('User', backref=db.backref('fundraisers', lazy=True))

    # Define relationship to donations
    donations = db.relationship('Donation', backref='fundraiser', lazy=True)

    def update_current_amount(self):
        # Update current amount by summing all donations
        self.current_amount = sum(donation.amount for donation in self.donations)
        db.session.commit()
