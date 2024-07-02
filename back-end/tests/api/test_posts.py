import requests

from fixtures.api_fixtures import create_test_user, create_test_post

BASE_URL = "http://localhost:2000"

def test_index_posts(create_test_post):  
    post_id = create_test_post
    url = f"{BASE_URL}/posts"
    response = requests.get(url)
    assert response.status_code == 200
    assert isinstance(response.json(), list)  # Expecting a list of posts
    # Check if the created post is in the list
    assert any(post['id'] == post_id for post in response.json())

def test_show_post(create_test_post):
    post_id = create_test_post
    url = f"{BASE_URL}/post/{post_id}"
    response = requests.get(url)
    assert response.status_code == 200
    post_data = response.json()
    assert post_data['id'] == post_id
    assert post_data['topic'] == "Test Topic"
    # Additional assertions can be added to verify other aspects of the post

def test_create_test_post(create_test_post):
    post_id = create_test_post
    # Verify the post was created successfully
    url = f"{BASE_URL}/post/{post_id}"
    response = requests.get(url)
    assert response.status_code == 200
    post_data = response.json()
    assert post_data['id'] == post_id
    assert post_data['topic'] == "Test Topic"
    # Additional assertions can be added to verify other aspects of the post

def test_delete_post(create_test_post):
    post_id = create_test_post
    url = f"{BASE_URL}/post/{post_id}"
    response = requests.delete(url)
    assert response.status_code == 205
    assert response.text == '"deleted"'
    # Verify the post is actually deleted
    response = requests.get(f"{BASE_URL}/posts")
    assert not any(post['id'] == post_id for post in response.json())
