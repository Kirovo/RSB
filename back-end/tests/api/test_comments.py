import requests

from fixtures.api_fixtures import create_test_user, create_test_post, create_test_comment

BASE_URL = "http://localhost:2000"

def test_index_comments(create_test_comment):  
    comment_id = create_test_comment
    url = f"{BASE_URL}/comments"
    response = requests.get(url)
    assert response.status_code == 200
    assert isinstance(response.json(), list)  # Expecting a list of comments
    # Check if the created comment is in the list
    assert any(comment['id'] == comment_id for comment in response.json())

def test_show_comment(create_test_comment):
    comment_id = create_test_comment
    url = f"{BASE_URL}/comment/{comment_id}"
    response = requests.get(url)
    assert response.status_code == 200
    comment_data = response.json()
    assert comment_data['id'] == comment_id
    assert comment_data['content'] == "This is a test comment"
    # Additional assertions can be added to verify other aspects of the comment

def test_create_comment(create_test_user, create_test_post):
    user_id = create_test_user
    post_id = create_test_post
    url = f"{BASE_URL}/comment"
    comment_data = {
        "id_post": post_id,
        "id_profile": user_id,
        "content": "New test comment"
    }
    response = requests.post(url, json=comment_data)
    assert response.status_code == 205
    new_comment = response.json()
    assert new_comment['content'] == "New test comment"
    # Additional assertions can be added to verify other aspects of the comment

def test_delete_comment(create_test_comment):
    comment_id = create_test_comment
    print(comment_id)
    print(comment_id)
    url = f"{BASE_URL}/comment/{comment_id}"
    response = requests.delete(url)
    assert response.status_code == 205
    print(response.text)
    assert response.text == '"deleted"'
    # Verify the comment is actually deleted
    response = requests.get(f"{BASE_URL}/comments")
    assert not any(comment['id'] == comment_id for comment in response.json())
