
from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api

# from .models import User, Cohort, CohortMember, Post, Notification, Fundraiser, Advert, AdminNotification, ChatMessage

from routes import Home
from models import db, login_manager
from routes.user_routes import Users
from routes.cohort_routes import Cohorts, CohortMembers
from routes.post_routes import Posts, Comments


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///map.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)

login_manager.init_app(app)

api.add_resource(Home, '/')
api.add_resource(Users, '/users')
api.add_resource(Cohorts, '/cohorts')
api.add_resource(CohortMembers, '/cohort_members')
api.add_resource(Posts, '/posts')
api.add_resource(Comments, '/comments')

if __name__ == '__main__':
    app.run(port=5555,debug=True)
