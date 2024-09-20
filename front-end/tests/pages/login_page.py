from selenium.webdriver.common.by import By




class LoginPage:
    url = 'http://localhost:3000/'

    email_input = (By.CSS_SELECTOR, '#email')
    password_input = (By.CSS_SELECTOR, '#password')
    login_button = (By.CSS_SELECTOR, '#login')
    register_button = (By.CSS_SELECTOR, '#register')


    def __init__(self, browser):
        self.browser = browser


    def open_page(self):
        self.browser.get(self.url)
        return self

    def attempt_login(self, email='john.doe@example.com', password='password'):
        self.browser.find_element(*self.email_input).send_keys(email)
        self.browser.find_element(*self.password_input).send_keys(password)
        self.browser.find_element(*self.login_button).click()

    def create_account(self, email='john.doe@example.com', password='password', firstname="John", lastname="Doe", mobile="06 06 06 06 06", 
                       birthdate="01/01/1990", gender="male", address="123 Main St, Anytown, USA", city="Anytown"):
        self.browser.find_element(*self.register_button).click()
        self.browser.find_element(By.CSS_SELECTOR, "input[name='firstname']").send_keys(firstname)
        self.browser.find_element(By.CSS_SELECTOR, "input[name='lastname']").send_keys(lastname)
        self.browser.find_element(By.CSS_SELECTOR, "input[name='email']").send_keys(email)
        self.browser.find_element(By.CSS_SELECTOR, "input[name='password']").send_keys(password)
        self.browser.find_element(By.CSS_SELECTOR, "input[name='mobile']").send_keys(mobile)
        self.browser.find_element(By.CSS_SELECTOR, "input[name='birthdate']").send_keys(birthdate)
        self.browser.find_element(By.CSS_SELECTOR, "input[name='gender']").send_keys(gender)
        self.browser.find_element(By.CSS_SELECTOR, "input[name='address']").send_keys(address)
        self.browser.find_element(By.CSS_SELECTOR, "input[name='city']").send_keys(city)
        self.browser.find_element(By.ID, "submit").click()
        return {'email': email, 'password': password}