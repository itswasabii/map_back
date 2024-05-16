from faker import Faker
from werkzeug.security import generate_password_hash
from app import app
from models import db
from models.user_model import User
from models.cohort_model import Cohort, CohortMember, CohortType
from models.post_model import Post, Comment, PostCategory
from models.advert_model import Advert
import random
from models.fundraiser_model import Fundraiser  # Import Fundraiser model

fake = Faker()
with app.app_context():
# Function to generate fake fundraisers
  def generate_fake_fundraisers(count=5):
        for _ in range(count):
            fundraiser = Fundraiser(
                user_id=fake.random_int(min=1, max=5),
                title=fake.sentence(),
                description=fake.text(),
                goal_amount=fake.random_int(min=100, max=1000),
                current_amount=fake.random_int(min=0, max=1000),
                start_date=fake.date_time_this_decade(),
                end_date=fake.date_time_this_decade()
            )
            db.session.add(fundraiser)
        db.session.commit()


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
        cohort_type = random.choice(['public', 'private'])  # Randomly choose between public and private
        
        if cohort_type == 'private':
        
            cohort = Cohort(
                cohort_name=fake.company(),
                year_of_enrollment=fake.random_int(min=2010, max=2022),  # Example range for year of enrollment
                course_id=fake.random_int(min=1, max=5),
                type=CohortType.PRIVATE,
                created_by=fake.random_int(min=1, max=5),
                created_at=fake.date_time_this_decade(),
                
          
            )
        else:
         
            cohort = Cohort(
                cohort_name=fake.company(),
                created_by=fake.random_int(min=1, max=5),
                created_at=fake.date_time_this_decade(),
                type=CohortType.PUBLIC
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

  

  if __name__ == '__main__':
      generate_fake_users()
      generate_fake_cohorts()
      generate_fake_cohort_members()
      generate_fake_posts()
      generate_fake_comments()
      generate_fake_fundraisers()
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
