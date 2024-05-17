from flask import Flask
from . import db, mail
from .models import User, Notification, Post, Cohort
from .routes import init_app

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/moringa_alumni'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['MAIL_SERVER'] = 'smtp.example.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = 'your-email@example.com'
    app.config['MAIL_PASSWORD'] = 'your-email-password'
    app.config['MAIL_DEFAULT_SENDER'] = 'your-email@example.com'

    db.init_app(app)
    mail.init_app(app)
    init_app(app)  
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
