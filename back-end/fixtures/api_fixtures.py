import pytest
import requests

BASE_URL = "http://localhost:2000"

@pytest.fixture
def create_test_user():
    user_url = f"{BASE_URL}/register"
    user_data = {
        "email": "testuser@example.com",
        "password": "testpassword",
        "firstname": "Test",
        "lastname": "User",
        "mobile": "1234567890",
        "birthdate": "1990-01-01",
        "gendre": "Other",
        "address": "123 Test St",
        "city": "Testville",
        "postalcode": "12345"
    }
    user_response = requests.post(user_url, json=user_data)
    user_id = user_response.json()['id']
    yield user_id
    # Cleanup after test
    requests.delete(f"{BASE_URL}/user/{user_id}")

@pytest.fixture
def create_test_post(create_test_user):
    user_id = create_test_user
    post_url = f"{BASE_URL}/post"
    post_data = {
        "id_profile": user_id,  # Link the post to the user ID
        "topic": "Test Topic"
    }
    post_response = requests.post(post_url, json=post_data)

    post_id = post_response.json()['id']
    yield post_id
    # Cleanup after test
    requests.delete(f"{BASE_URL}/post/{post_id}")

@pytest.fixture
def create_test_comment(create_test_user, create_test_post):
    user_id = create_test_user
    post_id = create_test_post
    comment_url = f"{BASE_URL}/comment"
    comment_data = {
        "id_post": post_id,
        "id_profile": user_id,
        "content": "This is a test comment"
    }
    comment_response = requests.post(comment_url, json=comment_data)
    comment_id = comment_response.json()['id']
    yield comment_id
    # Cleanup after test
    requests.delete(f"{BASE_URL}/comment/{comment_id}")