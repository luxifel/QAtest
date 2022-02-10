const {Builder, By, Key} = require("selenium-webdriver");
const capabilities = require("../Configuration/capabilities").capabilities;
const should = require("chai").should();




describe( "Verify login page", function() {
    var driver;
    var path = "/login";

    beforeEach( async function() {
        // before each test open a new browser window in order to start from a clean state
        driver = new Builder().forBrowser(capabilities.browser).build();
        // navigate to login page
        await driver.get(capabilities.endpoint + path);

    });

    afterEach( async function() {
        // after each test close the browser
        await driver.quit();
    });

    it( "Login page successfully load", async function() {

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

    it( "Verify empty phone number returns error", async function() {

        // without any action click on login button
        await driver.findElement(By.id("scala-login")).click();

        const expectedErrorMessage = "Inserisci un numero di cellulare valido";

        // get error message text
        let invalidText = await driver.findElement(By.css("div.invalid-feedback")).getText().then(function(value) {
            return value;
        })

        // compare
        expectedErrorMessage.should.be.equal(invalidText);

    });

    it( "Verify invalid numeric phone number returns error", async function() {

        // insert invalid numeric number
        await driver.findElement(By.id("phoneNumber")).sendKeys("0000");

        // click on login button
        await driver.findElement(By.id("scala-login")).click();

        const expectedErrorMessage = "Inserisci un numero di cellulare valido";

        // get error message text
        let invalidText = await driver.findElement(By.css("div.invalid-feedback")).getText().then(function(value) {
            return value;
        })

        // compare
        expectedErrorMessage.should.be.equal(invalidText);

    });

    it( "Verify invalid character phone number returns error", async function() {

        // insert invalid numeric number
        await driver.findElement(By.id("phoneNumber")).sendKeys("abcd");

        // click on login button
        await driver.findElement(By.id("scala-login")).click();

        const expectedErrorMessage = "Inserisci un numero di cellulare valido";

        // get error message text
        let invalidText = await driver.findElement(By.css("div.invalid-feedback")).getText().then(function(value) {
            return value;
        })

        // compare
        expectedErrorMessage.should.be.equal(invalidText);

    });

    it( "Verify correct phone number goes to OTP page", async function() {

        // insert invalid numeric number
        await driver.findElement(By.id("phoneNumber")).sendKeys(capabilities.phoneNumber);

        // click on login button
        await driver.findElement(By.id("scala-login")).click();

        // page need some time to load
        await driver.sleep(3000);

        // get error message text
        await driver.findElement(By.id("oneTimePassword")).isDisplayed().then(function(isVisible){
            // OTP field should be visible
            isVisible.should.be.true;
        });
    });

    // TODO I tried to bypass OTP but I wasn't able to do it in the 2 hours timeslot, my idea is to register
    // to an online website like https://www.infobip.com/ and use their API to retrieve the OTP sms value.
    


});