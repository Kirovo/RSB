import pytest

from pages.login_page import LoginPage


@pytest.fixture
def browser(chrome_browser):
    login_page = LoginPage(chrome_browser)
    login_page.open_page().create_account()
    login_page.open_page().attempt_login()
    yield chrome_browser
