# from . import  db
# from datetime import datetime

# class Fundraiser(db.Model):
#     fundraiser_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     cohort_id = db.Column(db.Integer, db.ForeignKey('cohort.cohort_id'), nullable=False)
#     title = db.Column(db.String(255), nullable=False)
#     description = db.Column(db.Text)
#     goal_amount = db.Column(db.Numeric(10, 2), nullable=False)
#     current_amount = db.Column(db.Numeric(10, 2), nullable=False, default=0)
#     created_by = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
#     created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

