
from tests.pages.login_page import LoginPage
from tests.fixtures.chrome import chrome_browser



def test_successful_login(chrome_browser):
    login_page = LoginPage(chrome_browser)
    login_page.open_page().create_account()
    login_page.open_page().attempt_login()
