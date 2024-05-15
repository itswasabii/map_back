# from . import  db
# from datetime import datetime

# class Notification(db.Model):
#     notification_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
#     content = db.Column(db.Text, nullable=False)
#     activity= db.Column(db.String(50), nullable=False)
#     activity_id= db.Column(db.Integer, nullable=False)
#     created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
#     is_read = db.Column(db.Boolean, nullable=False, default=False)

# class AdminNotification(db.Model):
#     admin_notification_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     content = db.Column(db.Text, nullable=False)
#     created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

# class ChatMessage(db.Model):
#     message_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
#     content = db.Column(db.Text, nullable=False)
#     created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    