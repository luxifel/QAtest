# Installation
you need npm installed on your computer (https://www.npmjs.com/)
you need the webdriver for the broeser you are going to use (https://www.npmjs.com/package/selenium-webdriver), remember to add it in your path variable

you need to open a terminal in the root folder and execute "npm install" in order to install all the required plugins

# Configuration
inside Configuration / Capabilities you have to specify the browser you are going to use and a valid phone number

# Executioin
you need to open a terminal in the root folder and execute "npm test"

# Results
you can view the results directly in the console or you can find an HTML report in the folder "mochawesome-report"; open it with your preferred browser.
The results are also available in the same folder as json file.

# Recommendation
Some tests are designed to test the happy path (when everything is supposed to work) while the others test the bad scenarios (error handling, validation, etc)
My recommendation is to use these test during different phases of the development cycle:

- during development the dev should run the happy path related to the feature he/she is working on
- before merging the dev should run all the happy paths
- during the night an automated scheduler should run all the tests on the staging branch, and forward the html report to the dev teams
- in case of issues the deployment process should be aborted (thanks to the json report)
- immediately after a deploy in production the happy path should be executed
- the first night after the deploy in production the full test suite should be executed