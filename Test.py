import json
from RestClient import RestClient
from static import baseUrl


class Test:

    def __init__(self,apiToTest):

        self.payload = apiToTest["payload"]
        self.endpoint = apiToTest["endpoint"]
        self.rest = RestClient(baseUrl + self.endpoint)

    def _deleteObjectFromDict(self,dictionary, objToRemove,innerObjToRemove=None):
        if innerObjToRemove:
            del self.payload[objToRemove][innerObjToRemove]
        else:
            del dictionary[objToRemove]
        return dictionary

    def testMissingField(self, statusCode,errormessage, fieldToDelete, innerFieldToDelete = None):

        print("-----------------------------------------")
        testPayload = self._deleteObjectFromDict(self.payload, fieldToDelete, innerFieldToDelete)
        response = self.rest.postRequest(testPayload)
        dictPayload = json.loads(response.content)

        try:
            assert (response.status_code == statusCode)
        except AssertionError:
            if innerFieldToDelete:
                print("Error - Missing field {} test failed. "
                      "Expected status code {}, find {}".format(innerFieldToDelete ,statusCode, response.status_code))
            else:
                print("Error - Missing field {} test failed. "
                      "Expected status code {}, find {}".format(fieldToDelete ,statusCode, response.status_code))
            print(response.text)
        if response.status_code != 200:
            try:
                assert (dictPayload["message"]["errors"][0]["messages"][0] == errormessage)
            except:
                print("Error - Missing field {} test failed. Check error message".format(str(fieldToDelete)))
                print(response.text)
        print("-----------------------------------------")

    def testInvalidField(self,wrongValue,statusCode, errorMessage,fieldToInvalidate, innerFieldToInvalidate = None):

        print("-----------------------------------------")
        if innerFieldToInvalidate:
            self.payload[fieldToInvalidate][innerFieldToInvalidate] = wrongValue
        else:
            self.payload[fieldToInvalidate] = wrongValue
        response = self.rest.postRequest(self.payload)
        dictPayload = json.loads(response.content)
        try:
            assert (response.status_code == statusCode)
        except AssertionError:
            if innerFieldToInvalidate:
                print("Error - Invalid field {} test failed.Check status code".format(innerFieldToInvalidate))
            else:
                print("Error - Invalid field {} test failed.Check status code".format(fieldToInvalidate))
            print(response.text)
        if response.status_code != 200:
            try:
                assert (dictPayload["message"]["errors"][0]["messages"][0] == errorMessage)
            except AssertionError:
                if innerFieldToInvalidate:
                    print("Error - Invalid field {} test failed. Check error message".format(innerFieldToInvalidate))
                else:
                    print("Error - Invalid field {} test failed. Check error message".format(fieldToInvalidate))
                print(response.text)
        print("-----------------------------------------")

    def happyPath(self, valueToSubtitute = None, fieldToSubstitute=None, innerFieldToSubstitute=None):

        if innerFieldToSubstitute:
            self.payload[fieldToSubstitute][innerFieldToSubstitute] = valueToSubtitute
        elif fieldToSubstitute:
            self.payload[fieldToSubstitute]= valueToSubtitute

        response = self.rest.postRequest(self.payload)
        try:
            assert (response.status_code == 200)
        except AssertionError:
            print("Error - Happy path test failed. Error message :{}".format(response.text))
