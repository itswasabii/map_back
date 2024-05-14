# from datetime import datetime
# from .app import app
# from .models import db, User, Cohort, CohortMember, Post, Notification, Fundraiser, Advert, AdminNotification, ChatMessage

# with app.app_context():
   
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
