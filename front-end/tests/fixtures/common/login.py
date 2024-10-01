import pytest

from tests.pages.login_page import LoginPage
from tests.pages.profile_page import ProfilePage


@pytest.fixture
def browser(chrome_browser):
    login_page = LoginPage(chrome_browser)
    login_page.open_page().create_account()
    login_page.open_page().attempt_login()
    yield chrome_browser
    profile_page = ProfilePage(chrome_browser)
    profile_page.delete_profile()
