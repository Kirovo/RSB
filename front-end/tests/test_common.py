
from tests.pages.login_page import LoginPage
from tests.pages.profile_page import ProfilePage
from tests.fixtures.chrome import chrome_browser
from tests.fixtures.common.login import browser

def test_successful_login(chrome_browser):
    login_page = LoginPage(chrome_browser)
    login_page.open_page().create_account()
    login_page.open_page().attempt_login()


def test_create_post(browser):
    profile_page = ProfilePage(browser)
    profile_page.create_post()

