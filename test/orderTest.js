const { expect } = require("chai");
const httpOptions = require("../Configuration/HttpOptions").options;
const utilities = require("../Utilities/Utilities");


describe( "Testing v2/orders endpoint", function() {

    // all the tests above are executed against v2/orders endpoint
    httpOptions.path = "/v2/orders";

    let contentData;

    beforeEach(function(){
        // before each test retore the content body to a valid state (all mandatory field have valid value)
        contentData = {
            totalAmount: {amount: '300', currency: 'eur'},
            consumer: {givenNames: 'Test name', surname: 'Test surname'},
            shipping: {
              countryCode: 'it',
              name: 'shipping name',
              postcode: '20145',
              line1: 'shipping line'
            },
            items: [
                {
                  price: {amount: '300', currency: 'eur'},
                  quantity: 1,
                  name: 'item name',
                  category: 'category',
                  sku: 'skucode'
                }
            ],
            merchant: {
              redirectCancelUrl: 'https://www.google.com',
              redirectConfirmUrl: 'https://www.google.com'
            }
          }
    });

    it.only("this is the happy path", async function(){
        return utilities.makeRequest(httpOptions, contentData)
         .then(function(data){
             expect(data).to.have.all.keys("token", "expires","checkoutUrl");
         });
     });





});