ENV = "STAGE"  #STAGE, DEV, PROD

if ENV == "STAGE":
    baseUrl = "https://staging.api.scalapay.com/"
    startURL = "https://portal.staging.scalapay.com/login"

elif ENV == "DEV":
    baseUrl = ""
    startURL = ""

elif ENV == "PROD":
    baseUrl = ""
    startURL = ""

phoneNumberXPath = '//*[@id="phoneNumber"]'
continueButtonXPath = '//*[@id="scala-login"]'
acceptCookiesBtnXPath = '//*[@id="CybotCookiebotDialogBodyButtonAccept"]'
OTPXPath = '//*[@id="oneTimePassword"]'
alertXPath = '//*[@id="passwordless-authentication-error-alert"]'