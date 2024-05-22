
from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from models import db, login_manager
from routes import Home
from routes.donation_routes import  DonationResource
from routes.user_routes import Users
from routes.cohort_routes import Cohorts, CohortMembers
from routes.post_routes import Posts, Comments, Likes, Shares, OnePost
from routes.fundraiser_routes import FundraiserResource
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
api.add_resource(OnePost,'/posts/<int:post_id>')
api.add_resource(Comments, '/posts/<int:post_id>/comment', '/posts/<int:post_id>/comment/<int:comment_id>')
api.add_resource(Likes, '/likes')
api.add_resource(Shares, '/shares')



api.add_resource(DonationResource, '/donations/<int:donation_id>')
api.add_resource(FundraiserResource, '/fundraisers', '/fundraisers/<int:fundraiser_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
