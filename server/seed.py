# from datetime import datetime
# from .app import app
# from .models import db, User, Cohort, CohortMember, Post, Notification, Fundraiser, Advert, AdminNotification, ChatMessage

# with app.app_context():



# from datetime import datetime
from faker import Faker
from werkzeug.security import generate_password_hash
from app import app
from models import db
from models.user_model import User
from models.cohort_model import Cohort, CohortMember
from models.post_model import Post, Comment, PostCategory
from models.advert_model import Advert
import random

fake = Faker()
with app.app_context():
  def generate_fake_users(count=5):
      for _ in range(count):
          user = User(
              username=fake.user_name(),
              email=fake.email(),
              password_hash=generate_password_hash(fake.password()),
              role=fake.random_element(elements=('admin', 'normal')),
              occupation=fake.job(),
              qualifications=fake.text(),
              bio=fake.text(),
              location=fake.city(),
              profile_picture_url=fake.image_url(),
              joined_at=fake.date_time_this_decade()
          )
          db.session.add(user)
      db.session.commit()

  def generate_fake_cohorts(count=5):
      for _ in range(count):
          cohort = Cohort(
              cohort_name=fake.company(),
              created_by=fake.random_int(min=1, max=5),
              created_at=fake.date_time_this_decade()
          )
          db.session.add(cohort)
      db.session.commit()

  def generate_fake_cohort_members(count=5):
      for _ in range(count):
          cohort_member = CohortMember(
              cohort_id=fake.random_int(min=1, max=5),
              user_id=fake.random_int(min=1, max=5),
              joined_at=fake.date_time_this_decade()
          )
          db.session.add(cohort_member)
      db.session.commit()

  def generate_fake_posts(count=5):
      categories = list(PostCategory)
      for _ in range(count):
          post = Post(
              user_id=fake.random_int(min=1, max=5),
              cohort_id=fake.random_int(min=1, max=5),
              content=fake.text(),
              category=random.choice(categories),
              created_at=fake.date_time_this_decade()
          )
          db.session.add(post)
      db.session.commit()

  def generate_fake_comments(count=5):
      for _ in range(count):
          comment = Comment(
              post_id=fake.random_int(min=1, max=5),
              user_id=fake.random_int(min=1, max=5),
              cohort_id=fake.random_int(min=1, max=5),
              content=fake.text(),
              created_at=fake.date_time_this_decade()
          )
          db.session.add(comment)
      db.session.commit()

  # def generate_fake_notifications(count=5):
  #     for _ in range(count):
  #         notification = Notification(
  #             user_id=fake.random_int(min=1, max=5),
  #             content=fake.text(),
  #             activity=fake.random_element(elements=('like', 'comment')),
  #             activity_id=fake.random_int(min=1, max=5),
  #             created_at=fake.date_time_this_decade(),
  #             is_read=fake.boolean()
  #         )
  #         db.session.add(notification)
  #     db.session.commit()

  # # def generate_fake_fundraisers(count=5):
  #     for _ in range(count):
  #         fundraiser = Fundraiser(
  #             cohort_id=fake.random_int(min=1, max=5),
  #             title=fake.text(),
  #             description=fake.text(),
  #             goal_amount=fake.random_int(min=100, max=10000),
  #             current_amount=fake.random_int(min=0, max=5000),
  #             created_by=fake.random_int(min=1, max=5),
  #             created_at=fake.date_time_this_decade()
  #         )
  #         db.session.add(fundraiser)
  #     db.session.commit()

  # def generate_fake_adverts(count=5):
  #     for _ in range(count):
  #         advert = Advert(     
  #             advert_id=fake.random_int(min=1, max=5),
  #             title=fake.sentence(),
  #             description=fake.text(),
  #             image_url=fake.image_url(),
  #             created_at=fake.date_time_this_decade()
  #         )
  #         db.session.add(advert)
  #     db.session.commit()

  # def generate_fake_admin_notifications(count=5):
  #     for _ in range(count):
  #         admin_notification = AdminNotification(
  #             content=fake.text(),
  #             created_at=fake.date_time_this_decade()
  #         )
  #         db.session.add(admin_notification)
  #     db.session.commit()

  # def generate_fake_chat_messages(count=5):
  #     for _ in range(count):
  #         chat_message = ChatMessage(
  #             user_id=fake.random_int(min=1, max=5),
  #             content=fake.text(),
  #             created_at=fake.date_time_this_decade()
  #         )
  #         db.session.add(chat_message)
  #     db.session.commit()

  if __name__ == '__main__':
      generate_fake_users()
      generate_fake_cohorts()
      generate_fake_cohort_members()
      generate_fake_posts()
      generate_fake_comments()
      # generate_fake_notifications()
      # generate_fake_fundraisers()
      # generate_fake_adverts()
      # generate_fake_admin_notifications()
      # generate_fake_chat_messages()

   
#     users = [
#         User(username='user1', email='user1@example.com', password_hash='password', role='normal', joined_at=datetime.utcnow()),
#         User(username='user2', email='user2@example.com', password_hash='password', role='normal', joined_at=datetime.utcnow()),
#         User(username='admin', email='admin@example.com', password_hash='password', role='admin', joined_at=datetime.utcnow())
#     ]

#     db.session.add_all(users)
#     db.session.commit()

#     cohorts = [
#         Cohort(cohort_name='Cohort 1', created_by=1, created_at=datetime.utcnow()),
#         Cohort(cohort_name='Cohort 2', created_by=2, created_at=datetime.utcnow())
#     ]

#     db.session.add_all(cohorts)
#     db.session.commit()

#     cohort_members = [
#         CohortMember(cohort_id=1, user_id=1, joined_at=datetime.utcnow()),
#         CohortMember(cohort_id=1, user_id=2, joined_at=datetime.utcnow()),
#         CohortMember(cohort_id=2, user_id=1, joined_at=datetime.utcnow())
#     ]

#     db.session.add_all(cohort_members)
#     db.session.commit()

#     posts = [
#         Post(user_id=1, cohort_id=1, content='Post 1 content', created_at=datetime.utcnow()),
#         Post(user_id=2, cohort_id=1, content='Post 2 content', created_at=datetime.utcnow())
#     ]

#     db.session.add_all(posts)
#     db.session.commit()

#     notifications = [
#         Notification(user_id=1, content='Notification 1 content', activity='like', activity_id=1, created_at=datetime.utcnow(), is_read=False),
#         Notification(user_id=2, content='Notification 2 content', activity='comment', activity_id=2, created_at=datetime.utcnow(), is_read=True)
#     ]

#     db.session.add_all(notifications)
#     db.session.commit()

#     fundraisers = [
#         Fundraiser(cohort_id=1, title='Fundraiser 1', description='Fundraiser 1 description', goal_amount=1000, current_amount=500, created_by=1, created_at=datetime.utcnow())
#     ]

#     db.session.add_all(fundraisers)
#     db.session.commit()

#     adverts = [
#         Advert(title='Advert 1', description='Advert 1 description', image_url='https://example.com/image.jpg', created_at=datetime.utcnow())
#     ]

#     db.session.add_all(adverts)
#     db.session.commit()

#     admin_notifications = [
#         AdminNotification(content='Admin notification 1', created_at=datetime.utcnow())
#     ]

#     db.session.add_all(admin_notifications)
#     db.session.commit()

#     chat_messages = [
#         ChatMessage(user_id=1, content='Message 1', created_at=datetime.utcnow())
#     ]

#     db.session.add_all(chat_messages)
#     db.session.commit()

#     print('Sample data has been seeded successfully!')

[
    {
        "username": "user1",
        "email": "user1@example.com",
        "password_hash": "password1",
        "role": "normal",
        "joined_at": "2024-05-15T12:00:00"
    },
    {
        "username": "user2",
        "email": "user2@example.com",
        "password_hash": "password2",
        "role": "normal",
        "joined_at": "2024-05-16T12:00:00"
    },
    {
        "username": "user3",
        "email": "user3@example.com",
        "password_hash": "password3",
        "role": "admin",
        "joined_at": "2024-05-17T12:00:00"
    },
    {
        "username": "user4",
        "email": "user4@example.com",
        "password_hash": "password4",
        "role": "normal",
        "joined_at": "2024-05-18T12:00:00"
    },
    {
        "username": "user5",
        "email": "user5@example.com",
        "password_hash": "password5",
        "role": "normal",
        "joined_at": "2024-05-19T12:00:00"
    }
]


{
  "cohort_id": 1,
  "cohort_name": "Cohort A",
  "created_by": 1,
  "created_at": "2024-05-14T13:00:00",
  "members": [
    {
      "member_id": 1,
      "user_id": 1,
      "joined_at": "2024-05-14T13:00:00"
    },
    {
      "member_id": 2,
      "user_id": 2,
      "joined_at": "2024-05-14T13:30:00"
    }
  ],
  "posts": [
    {
      "post_id": 1,
      "user_id": 1,
      "content": "Post content 1",
      "created_at": "2024-05-14T13:10:00"
    },
    {
      "post_id": 2,
      "user_id": 2,
      "content": "Post content 2",
      "created_at": "2024-05-14T13:20:00"
    }
  ],
  "fundraisers": [
    {
      "fundraiser_id": 1,
      "title": "Fundraiser A",
      "description": "Fundraiser A description",
      "goal_amount": 1000,
      "current_amount": 500,
      "created_by": 1,
      "created_at": "2024-05-14T13:30:00"
    }
  ]
}

[
  {
    "member_id": 1,
    "cohort_id": 1,
    "user_id": 1,
    "joined_at": "2024-05-14T09:00:00"
  },
  {
    "member_id": 2,
    "cohort_id": 1,
    "user_id": 2,
    "joined_at": "2024-05-14T09:15:00"
  },
  {
    "member_id": 3,
    "cohort_id": 2,
    "user_id": 3,
    "joined_at": "2024-05-14T09:30:00"
  }
]
