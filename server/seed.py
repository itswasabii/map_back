from faker import Faker
from werkzeug.security import generate_password_hash
from app import app
from models import db
from models.user_model import User
from models.cohort_model import Cohort, CohortMember, CohortType, Course
from models.post_model import Post, Comment, PostCategory, Share, Like
from models.advert_model import Advert
import random
from models.fundraiser_model import Fundraiser  # Import Fundraiser model
from datetime import datetime
from models.fundraiser_model import Donation


fake = Faker()
with app.app_context():
# Function to generate fake fundraisers
#   def generate_fake_fundraisers(count=5):
#         for _ in range(count):
#             fundraiser = Fundraiser(
#                 user_id=fake.random_int(min=1, max=5),
#                 title=fake.sentence(),
#                 description=fake.text(),
#                 goal_amount=fake.random_int(min=100, max=1000),
#                 current_amount=fake.random_int(min=0, max=1000),
#                 start_date=fake.date_time_this_decade(),
#                 end_date=fake.date_time_this_decade()
#             )
#             db.session.add(fundraiser)
#         db.session.commit()


  def generate_fake_users(count=5):
      for _ in range(count):
          course_names = ['Data Science', 'Software Engineering', 'DevOps']
          courses = [Course(course_name=course_name) for course_name in course_names]
          db.session.add_all(courses)
          db.session.commit()
          user = User(
              username=fake.user_name(),
              email=fake.email(),
              password_hash=generate_password_hash(fake.password()),
            #   role='normal',
              occupation=fake.job(),
              qualification=fake.text(),
              bio=fake.text(),
              location=fake.city(),
              joined_at=fake.date_time_this_decade()

          )
          num_courses = random.randint(1, 3)
          user.courses.extend(random.sample(courses, num_courses))
          db.session.add(user)
      db.session.commit()

  def generate_fake_cohorts(count=2):
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
      users = User.query.all()
      cohorts = Cohort.query.all()
      for _ in range(count):
          user = random.choice(users)
          cohort = random.choice(cohorts)
          post = Post(
              user_id=user.user_id,
              cohort_id=cohort.cohort_id,
              content=fake.text(),
              category=random.choice(categories),
              created_at=fake.date_time_this_decade()
          )
          db.session.add(post)

          for _ in range(random.randint(1, 10)):
                like = Like(user_id=random.choice(users).user_id, post_id=post.post_id)
                post.likes_count += 1
                db.session.add(like)

                    # Create comments for each post
          for _ in range(random.randint(1, 5)):
                random_user = random.choice(users)
                comment = Comment(
                    user_id=random_user.user_id,
                    user_name=random_user.username,
                    post_id=post.post_id,
                    content=fake.text(),
                    created_at=fake.date_time_this_decade()
                )
                post.comments_count += 1
                db.session.add(comment)


          for _ in range(random.randint(1, 3)):
                share = Share(user_id=random.choice(users).user_id, post_id=post.post_id)
                post.shares_count += 1
                db.session.add(share)

  if __name__ == '__main__':
      generate_fake_users()
      generate_fake_cohorts()
      generate_fake_cohort_members()
      generate_fake_posts()
    
    #   generate_fake_fundraisers()


# Function to seed fundraiser and donation data
def seed_donations():
    
  with app.app_context():
    # Create fundraisers


    fundraisers = [
        {
            'user_id': 1,
            'title': 'Scholarship Fundraiser for Moringa School Students',
            'description': 'Support Moringa School students by contributing to this scholarship fundraiser. '
                            'Your donation will help talented individuals access quality tech education, '
                            'empowering them to transform their lives and communities.',
            'goal_amount': 10000.0,
            'end_date': datetime(2024, 6, 1)
        },
        {
            'user_id': 2,
            'title': 'Expansion Fundraiser for Moringa School',
            'description': 'Help Moringa School expand its facilities and resources to accommodate more students '
                            'and provide them with the best learning environment possible. Together, we can '
                            'empower more individuals with the skills they need to succeed in tech.',
            'goal_amount': 15000.0,
            'end_date': datetime(2024, 6, 15)
        }
    ]


    # Create donations
    donations = [
        {
            
            'fundraiser_id': 1,
            'user_id': 3,
            'amount': 500.0,
            'donation_date': datetime(2024, 5, 20)
        },
        {
            'fundraiser_id': 2,
            'user_id': 4,
            'amount': 1000.0,
            'donation_date': datetime(2024, 5, 25)
        }
        # Add more donations as needed
    ]

    # Seed fundraisers
    for fundraiser_data in fundraisers:
        fundraiser = Fundraiser(**fundraiser_data)
        db.session.add(fundraiser)

    # Seed donations
    for donation_data in donations:
        donation = Donation(**donation_data)
        db.session.add(donation)

    # Commit changes to the database
    db.session.commit()

if __name__ == '__main__':
    seed_donations()