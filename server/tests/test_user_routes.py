import pytest
from app import app, db
from models.user_model import User

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.drop_all()

def test_register(client):
    response = client.post('/register', json={
        'username': 'testuser',
        'password': 'testpassword',
        'email': 'test@example.com'
    })
    assert response.status_code == 200
    assert b'User has been registered' in response.data

def test_login(client):
    client.post('/register', json={
        'username': 'testuser',
        'password': 'testpassword',
        'email': 'test@example.com'
    })
    response = client.post('/login', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    assert response.status_code == 200
    assert b'User logged in successfully' in response.data

def test_forgot_password(client):
    client.post('/register', json={
        'username': 'testuser',
        'password': 'testpassword',
        'email': 'test@example.com'
    })
    response = client.post('/forgot_password', json={
        'email': 'test@example.com'
    })
    assert response.status_code == 200
    assert b'Password reset link sent to your email' in response.data

def test_reset_password(client):
    client.post('/register', json={
        'username': 'testuser',
        'password': 'testpassword',
        'email': 'test@example.com'
    })
    client.post('/forgot_password', json={
        'email': 'test@example.com'
    })
    reset_token = User.query.filter_by(email='test@example.com').first().reset_token.token
    response = client.post('/reset_password', json={
        'token': reset_token,
        'new_password': 'newpassword',
        'confirm_password': 'newpassword'
    })
    assert response.status_code == 200
    assert b'Password has been reset successfully' in response.data

def test_test_email(client):
    response = client.get('/test_email')
    assert response.status_code == 200
    assert b'Email sent successfully' in response.data
