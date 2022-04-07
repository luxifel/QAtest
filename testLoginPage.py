from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
import os
from static import phoneNumberXPath , continueButtonXPath, acceptCookiesBtnXPath, OTPXPath, alertXPath
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time, random

from static import startURL

class LoginPage:


    driver_exec = os.path.join(os.getcwd() + "/driver/chromedriver.exe")

    def __init__(self):

        self.phoneNumber = random.randint(10,9999999999)
        print(self.phoneNumber)
        self.code = "000000"
        self.options = webdriver.ChromeOptions()
        # init browser
        self.browser = webdriver.Chrome(self.driver_exec, options=self.options)
        self.login()


    def login(self):
        try:
            # get login page
            print("Loading login page..")
            self.browser.get(startURL)
            time.sleep(5)
            #accept cookies
            WebDriverWait(self.browser,10).until(EC.element_to_be_clickable(self.browser.find_element(By.XPATH, acceptCookiesBtnXPath)))
            self.browser.find_element(By.XPATH, acceptCookiesBtnXPath).click()
            #insert phone number
            print("Insert phone number")
            phoneNumberInput = self.browser.find_element(By.XPATH,phoneNumberXPath)
            phoneNumberInput.send_keys(self.phoneNumber)
            #click on continue btn
            print("Click on Continue btn")
            self.browser.find_element(By.XPATH,continueButtonXPath).click()
            #assert you are in insert code page
            WebDriverWait(self.browser,10).until(EC.element_to_be_clickable(self.browser.find_element(By.XPATH, OTPXPath)))
            otp = self.browser.find_element(By.XPATH, OTPXPath)
            otp.click()
            otp.send_keys(self.code)
            self.browser.find_element(By.XPATH, continueButtonXPath).click()
            WebDriverWait(self.browser, 10).until(
                EC.element_to_be_clickable(self.browser.find_element(By.XPATH, alertXPath)))
            print("You're landed in right page!")
        except Exception as e:
            print("Something went wrong in login: %s" %e)


if __name__ == "__main__":
    LoginPage()