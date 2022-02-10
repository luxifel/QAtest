const {Builder, By, Key} = require("selenium-webdriver");
const capabilities = require("../Configuration/capabilities").capabilities;
const should = require("chai").should();




describe( "Verify login page", function() {
    var driver;
    var path = "/login";

    beforeEach( function() {
        // before each test open a new browser window in order to start from a clean state
        driver = new Builder().forBrowser(capabilities.browser).build();

    });

    afterEach( async function() {
        // after each test close the browser
        await driver.quit();
    });

    it( "Login page successfully load", async function() {
        // navigate to login page
        await driver.get(capabilities.endpoint + path);

        // check if title is "Registrati o accedi"
        // TODO move hardcoded italian strings into configuration file
        // need to find a way to understand the current locale and pick
        // the text from the right file
        const expectedTitle = "Registrati o accedi";

        // retrieve title
        let titleText = await driver.findElement(By.css("h1.text-dark-50.text-center")).getText().then(function(value){
            return value;
        });

        // compare expected and actual titles
        expectedTitle.should.be.equal(titleText);
    });


});