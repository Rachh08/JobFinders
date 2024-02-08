// var { app , server } = require("../index")
// const { Builder, By, Key, until } = require('selenium-webdriver');
// const { describe, it, before, after } = require('mocha');
// const { expect } = require("chai");
// const fs = require('fs').promises;
// const path = require('path');


// const chrome = require('selenium-webdriver/chrome');
// const chromeOptions = new chrome.Options();
// //chromeOptions.addArguments("--headless"); 
// const driver = new Builder()
//     .forBrowser("chrome")
//     .setChromeOptions(chromeOptions)
//     .build();

// // var server;


// before(async function () {
//     server = await new Promise((resolve) => {
//         const server = app.listen(0, "localhost", () => {
//             resolve(server);
//         });
//     });
// });



// describe('Testing Register UI', function () {

//     it('Should show error message - Invalid name format', async function () {
//         this.timeout(100000);
//         const baseUrl = 'http://localhost:' + server.address().port + '/instrumented/register.html';
//         await driver.get(baseUrl);

//         // Locate the Register button and click it
//         const registerButton = await driver.findElement(By.id('registerButton'));
//         await registerButton.click();
//         await driver.sleep(1000);

//         // Locate the error element and retrieve its text
//         const errorMessageElement = await driver.findElement(By.id('error'));
//         const errorMessage = await errorMessageElement.getText();

//         // Log error message to console
//         console.log("Error message:", errorMessage);

//         // Assert that the error message contains the expected text
//         expect(errorMessage).to.equal('Invalid name format!');
//     });

// });

// describe('Testing Search Functionality', function () {
//     it('Should display search results correctly', async function () {
//         this.timeout(100000);

//         const baseUrl = 'http://localhost:' + server.address().port + '/instrumented/home.html';

//         await driver.get(baseUrl); // Navigate to the home page

//         // Assuming you have a search input field with the id 'searchInput'
//         const searchInput = await driver.findElement(By.id('searchInput'));

//         // Input a search query
//         await searchInput.sendKeys('example query');

//         // Locate and interact with the search button (assuming it has the id 'searchButton')
//         const searchButton = await driver.findElement(By.id('searchButton'));
//         await searchButton.click();

//         // Assuming search results are displayed in a div with the id 'searchResults'
//         const searchResults = await driver.findElement(By.id('searchResults')).getText();

//         // Assuming there is also a count element with the id 'resultCount'
//         const resultCount = await driver.findElement(By.id('resultCount')).getText();

//         // Perform assertions to check if the search results and count are as expected
//         expect(searchResults).to.include('Expected Result');
//         expect(resultCount).to.equal('1'); // Update with the expected count based on the test case

//         // Clear the search input for the next test
//         await searchInput.clear();
//     });
//     // afterEach(async function () {
//     //     await driver.executeScript('return window.__coverage__;').then(async (coverageData) => {
//     //         if (coverageData) {
//     //             // Save coverage data to a file
//     //             await fs.writeFile('coverage-frontend/coverage' + counter++ + '.json',
//     //                 JSON.stringify(coverageData), (err) => {
//     //                     if (err) {
//     //                         console.error('Error writing coverage data:', err);
//     //                     } else {
//     //                         console.log('Coverage data written to coverage.json');
//     //                     }
//     //                 });
//     //         }
//     //     });
//     // });
// });


// after(async function () {
//     await driver.quit();
//     server.close();
//     process.exit(0);
// }); 

var { app } = require("../index")
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it, before, after } = require('mocha');
const { expect } = require("chai");
const fs = require('fs').promises;
// const path = require('path');


const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();
chromeOptions.addArguments("--headless"); 
const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();

var server;


before(async function () {
    server = await new Promise((resolve) => {
        const server = app.listen(0, "localhost", () => {
            resolve(server);
        });
    });
});

describe('Testing Register UI', function () {
    it('Should show error message - Invalid name format', async function () {
        this.timeout(100000);
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented/register.html';
        await driver.get(baseUrl);
        // Locate the Register button and click it
        const registerButton = await driver.findElement(By.id('registerButton'));
        await registerButton.click();
        await driver.sleep(1000);
        // Locate the error element and retrieve its text
        const errorMessageElement = await driver.findElement(By.id('error'));
        const errorMessage = await errorMessageElement.getText();
        // Log error message to console
        console.log("Error message:", errorMessage);
        // Assert that the error message contains the expected text
        expect(errorMessage).to.equal('Invalid name format!');
    });
    it('Should show error message - Password does not match', async function () {
        this.timeout(100000);
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented/register.html';
        await driver.get(baseUrl);

        // Locate and interact with the email field
        const emailElement = await driver.findElement(By.id('email'));
        await emailElement.click(); // Click on the element
        await emailElement.sendKeys('paul@gmail.com');

        // Locate and interact with the password field
        const passwordElement = await driver.findElement(By.id('password'));
        await emailElement.click(); // Click on the element
        await passwordElement.sendKeys('123456');

        // Locate and interact with the confirm password field
        const confirmPasswordElement = await driver.findElement(By.id('confirmPassword'));
        await confirmPasswordElement.click(); // Click on the element
        await confirmPasswordElement.sendKeys('1234');

        // Locate and interact with the Register button
        const registerButton = await driver.findElement(By.xpath('//button[text()="Register"]'));
        await registerButton.click();

        // Locate the error element and retrieve its text
        const errorMessage = await driver.findElement(By.id('error')).getText();
        const errorStyle = await driver.findElement(By.id('error')).getAttribute('class');

        // Assert that the error message contains the expected text and style
        expect(errorMessage).to.equal('Invalid name format!');
        //expect(errorStyle).to.equal('text-danger');
    });
});


describe('Testing Search Functionality', function () {
    it('Should display search results correctly', async function () {
        this.timeout(100000);

        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented/home.html';

        await driver.get(baseUrl); // Navigate to the home page

        const searchInput = await driver.findElement(By.id('query'));

        // Input a search query
        await searchInput.sendKeys('example query');

        // Locate and interact with the search button 
        const searchButton = await driver.findElement(By.id('searchButton'));
        await searchButton.click();

        const searchResultsModal = await driver.findElement(By.id("searchResultsModal"));
        await driver.wait(until.elementIsVisible(searchResultsModal), 5000);

        const searchResults = await driver.findElement(By.id('displaySearchResults')).getText();
        console.log(searchResults + "...")
        expect(searchResults).to.contains('No results found');
    });


    afterEach(async function () {
        await driver.executeScript('return window.__coverage__;').then(async (coverageData) => {
            if (coverageData) {
                // Save coverage data to a file
                await fs.writeFile('coverage-frontend/coverage' + counter++ + '.json',
                    JSON.stringify(coverageData), (err) => {
                        if (err) {
                            console.error('Error writing coverage data:', err);
                        } else {
                            console.log('Coverage data written to coverage.json');
                        }
                    });
            }
        });
    });
});


after(async function () {
    await driver.quit();
    server.close();
    // process.exit(0);
});