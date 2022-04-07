from data import ordersAPI
from Test import Test
import copy

Test(copy.deepcopy(ordersAPI)).testMissingField(400,"\"totalAmount\" is required",  "totalAmount")
Test(copy.deepcopy(ordersAPI)).testMissingField(400,"\"merchant\" is required","merchant")
Test(copy.deepcopy(ordersAPI)).testMissingField(400,"\"consumer\" is required", "consumer")
Test(copy.deepcopy(ordersAPI)).testMissingField(400,"\"amount\" is required", "totalAmount", "amount")
Test(copy.deepcopy(ordersAPI)).testMissingField(400,"\"currency\" is required", "totalAmount", "currency")
Test(copy.deepcopy(ordersAPI)).testMissingField(400,"\"givenNames\" is required", "consumer", "givenNames")
Test(copy.deepcopy(ordersAPI)).testMissingField(400,"\"surname\" is required", "consumer", "surname")
Test(copy.deepcopy(ordersAPI)).testMissingField(400,"\"redirectCancelUrl\" is required", "merchant", "redirectCancelUrl")
Test(copy.deepcopy(ordersAPI)).testMissingField(400,"\"redirectConfirmUrl\" is required", "merchant", "redirectConfirmUrl")


Test(copy.deepcopy(ordersAPI)).testInvalidField("6y7",400, "\"amount\" with value \"6y7\" fails to match the "
                                "required pattern: /^\\d*\\.?\\d*$/","totalAmount","amount")
Test(copy.deepcopy(ordersAPI)).testInvalidField("328ryuibf000",400, "\"phoneNumber\" with value \"328ryuibf000\" fails to match the "
                                "required pattern: ","consumer","phoneNumber")
Test(copy.deepcopy(ordersAPI)).testInvalidField("myemail.com",400, "\"email\" must be a valid email","consumer","email")
Test(copy.deepcopy(ordersAPI)).testInvalidField("GBP",400, "\"currency\" must be one of [eur, EUR]","totalAmount","currency")
Test(copy.deepcopy(ordersAPI)).testInvalidField("httpmyconfirmurl.com",400, "\"redirectConfirmUrl\" must be a valid uri with a scheme matching the http|https pattern","merchant", "redirectConfirmUrl")
Test(copy.deepcopy(ordersAPI)).testInvalidField("httpmycancelurl.com",400, "\"redirectCancelUrl\" must be a valid uri with a scheme matching the http|https pattern","merchant", "redirectCancelUrl")


Test(copy.deepcopy(ordersAPI)).happyPath("eur","totalAmount","currency")
Test(copy.deepcopy(ordersAPI)).happyPath("http://mycancelurl.com","merchant","redirectCancelUrl")
Test(copy.deepcopy(ordersAPI)).happyPath("http://myconfirmurl.com","merchant","redirectConfirmUrl")
Test(copy.deepcopy(ordersAPI)).happyPath()
