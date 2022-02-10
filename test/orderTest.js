const { expect } = require("chai");
const httpOptions = require("../Configuration/HttpOptions").options;
const utilities = require("../Utilities/Utilities");
const { Builder, By, Key } = require("selenium-webdriver");
const capabilities = require("../Configuration/capabilities").capabilities;
const should = require("chai").should();


describe("Testing v2/orders endpoint", function () {

  // all the tests above are executed against v2/orders endpoint
  httpOptions.path = "/v2/orders";

  let contentData;

  beforeEach(function () {
    // before each test retore the content body to a valid state (all mandatory field have valid value)
    contentData = {
      totalAmount: { amount: '300', currency: 'eur' },
      consumer: { givenNames: 'Test name', surname: 'Test surname' },
      shipping: {
        countryCode: 'it',
        name: 'shipping name',
        postcode: '20145',
        line1: 'shipping line'
      },
      items: [
        {
          price: { amount: '300', currency: 'eur' },
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

  it("this is the happy path", async function () {
    return utilities.makeRequest(httpOptions, contentData)
      .then(function (data) {
        expect(data).to.have.all.keys("token", "expires", "checkoutUrl");
      });
  });

  it("if totalAmount is missing return proper error message", async function () {
    return removeMandatoryFieldAndTest("totalAmount", "body", contentData);
  });

  it("if consumer is missing return proper error message", async function () {
    return removeMandatoryFieldAndTest("consumer", "body", contentData);
  });

  it("if shipping is missing return proper error message", async function () {
    return removeMandatoryFieldAndTest("shipping", "body", contentData);
  });

  it("if items is missing return proper error message", async function () {
    return removeMandatoryFieldAndTest("items", "body", contentData);
  });

  it("if merchant is missing return proper error message", async function () {
    return removeMandatoryFieldAndTest("merchant", "body", contentData);
  });

  it("verify totalAmount can not be a string", async function () {
    contentData["totalAmount"]["amount"] = "aaa";
    return utilities.makeRequest(httpOptions, contentData)
      .then(function (data) {
        // check the error code is present
        expect(data["errorCode"]).to.be.equal("api_validationerror");
        const errors = data["message"]["errors"];
        // there should be only one error
        expect(errors.length).to.be.equal(1);
        const error = errors[0];
        // verify the error is related to the failing regex
        expect(error["field"]).to.have.all.members(["totalAmount", "amount"]);
        expect(error["types"][0]).to.be.equal("string.regex.base");

      });
  });

  it("Verify checkoutUrl has the right summary", async function () {
    const expectedValue = 300;
    contentData["totalAmount"]["amount"] = expectedValue.toString();
    return utilities.makeRequest(httpOptions, contentData)
      .then(function (data) {
        expect(data).to.have.all.keys("token", "expires", "checkoutUrl");


        // open redirect url page
        driver = new Builder().forBrowser(capabilities.browser).build();
        driver.get(data["checkoutUrl"]);

        return driver.findElement(By.xpath("/html/body/div[6]/div[2]/div/div[2]/div[5]/div/div/div[2]")).getText().then(function (value) {
          "300,00 €".should.be.equal(value);

          // I would also check that the 3 installments it's correct 

          driver.quit()
        });




      });
  });

});



function removeMandatoryFieldAndTest(field, position, content) {
  // remove the field from the body
  delete content[field];
  // make the request
  return utilities.makeRequest(httpOptions, content)
    .then(function (data) {
      // check the error code is present
      expect(data["errorCode"]).to.be.equal("api_validationerror");
      const errors = data["message"]["errors"];
      // there should be only one error
      expect(errors.length).to.be.equal(1);
      const error = errors[0];
      // verify the error is related to the missing field
      expect(error["location"]).to.be.equal(position);
      expect(error["field"][0]).to.be.equal(field);
      expect(error["types"][0]).to.be.equal("any.required");
    });
}