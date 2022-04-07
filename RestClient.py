import requests

class RestClient:

    def __init__(self, url):

        self.url = url

    def postRequest(self,payload) :

        headers = {
            "Accept": "application/json; charset=utf-8",
            "Content-Type": "application/json",
            "Authorization": "Bearer qhtfs87hjnc12kkos"
        }

        response = requests.request("POST", self.url, headers=headers, json=payload)
        #print(response.text)
        return response

    def getRequest(self) :

        headers = {
            "Accept": "application/json; charset=utf-8",
            "Authorization": "Bearer qhtfs87hjnc12kkos"
        }

        response = requests.request("GET", self.url, headers=headers)
        print(response.text)
        return response
