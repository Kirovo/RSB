from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait



class ProfilePage:
    email_input = (By.CSS_SELECTOR, '#email')



    def __init__(self, browser):
        self.browser = browser
        self.wait = WebDriverWait(browser, 10)

    def create_post(self):
        self.browser.find_element(By.CSS_SELECTOR, '#create-post').click()
        self.browser.find_element(By.CSS_SELECTOR, '#topic').send_keys('This is a test post')
        self.browser.find_element(By.CSS_SELECTOR, '#send').click()

    def delete_profile(self):
        self.browser.find_element(By.CSS_SELECTOR, '#delete-profile').click()
