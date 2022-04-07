ordersAPI = {"endpoint" : "v2/orders/",
            "payload" : {
                "totalAmount": {
                        "amount": "5",
                        "currency": "EUR"
                    },
                "consumer": {
                            "phoneNumber": "3280000000",
                            "givenNames": "MyName",
                            "surname": "MySurname",
                            "email": "myemail@gmail.com"
                        },
                "merchant": {
                            "redirectCancelUrl": "https://mycancelurl.com",
                            "redirectConfirmUrl": "https://myconfirmurl.com"
                        }
            }
}


