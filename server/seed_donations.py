from app import app, db
from models.fundraiser_model import Fundraiser, Donation
from faker import Faker
import random

fake = Faker()

# Function to seed donation data
def seed_donations():
    with app.app_context():
        # Retrieve all fundraisers from the database
        fundraisers = Fundraiser.query.all()

        # Seed donations for each fundraiser
        for fundraiser in fundraisers:
            # Generate a random number of donations (between 0 and 5) for each fundraiser
            num_donations = random.randint(0, 5)

            # Generate donations
            for _ in range(num_donations):
                donation = Donation(
                    fundraiser_id=fundraiser.id,
                    user_id=fake.random_int(min=1, max=5),  # Randomly select a user ID
                    amount=fake.random_int(min=10, max=500),  # Generate a random donation amount
                    donation_date=fake.date_time_this_decade()  # Generate a random donation date
                )
                db.session.add(donation)

        # Commit changes to the database
        db.session.commit()

if __name__ == '__main__':
    seed_donations()
