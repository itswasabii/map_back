
from flask import Flask
from .models import db, login_manager
from flask_migrate import Migrate
from .models import User, Cohort, CohortMember, Post, Notification, Fundraiser, Advert, AdminNotification, ChatMessage
from .routes import bp as routes_bp
    

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///map.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
app.register_blueprint(routes_bp)
db.init_app(app)
login_manager.init_app(app)

if __name__ == '__main__':
    app.run(port=5555,debug=True)
