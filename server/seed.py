from flask import Flask
from werkzeug.security import generate_password_hash
from app import app
from models import db
from models.user_model import User

# Flask app context
with app.app_context():
    # Create admin user
    admin_user = User(
        username='admin',
        email='admin@example.com',
        password_hash=generate_password_hash('password'),
        role='admin'
    )
    db.session.add(admin_user)
    db.session.commit()
