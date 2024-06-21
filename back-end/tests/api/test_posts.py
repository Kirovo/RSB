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
def create_post(create_test_user):
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


def test_create_post(create_post):
    post_id = create_post
    # Verify the post was created successfully
    url = f"{BASE_URL}/post/{post_id}"
    response = requests.get(url)
    assert response.status_code == 200
    post_data = response.json()
    assert post_data['id'] == post_id
    assert post_data['topic'] == "Test Topic"
    # Additional assertions can be added to verify other aspects of the post

def test_index_posts(create_post):
    post_id = create_post
    url = f"{BASE_URL}/posts"
    response = requests.get(url)
    assert response.status_code == 200
    assert isinstance(response.json(), list)  # Expecting a list of posts
    # Check if the created post is in the list
    assert any(post['id'] == post_id for post in response.json())

def test_delete_post(create_post):
    post_id = create_post
    url = f"{BASE_URL}/post/{post_id}"
    response = requests.delete(url)
    assert response.status_code == 205
    assert response.text == '"deleted"'
    # Verify the post is actually deleted
    response = requests.get(f"{BASE_URL}/posts")
    assert not any(post['id'] == post_id for post in response.json())

def test_show_post(create_post):
    post_id = create_post
    url = f"{BASE_URL}/post/{post_id}"
    response = requests.get(url)
    assert response.status_code == 200
    post_data = response.json()
    assert post_data['id'] == post_id
    assert post_data['topic'] == "Test Topic"
    # Additional assertions can be added to verify other aspects of the post
