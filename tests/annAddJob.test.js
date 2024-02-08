// const { app } = require('../index');
// const { Builder, By, Key, until } = require('selenium-webdriver');
// const { describe, it, after } = require('mocha');
// const { expect } = require('chai');
// const fs = require('fs').promises;

// const chrome = require('selenium-webdriver/chrome');
// const e = require('express');
// const chromeOptions = new chrome.Options();
// chromeOptions.addArguments('--headless');

// const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

// var server;
// var counter = 0;

// before(async function () {
//     server = await new Promise((resolve) => {
//         server = app.listen(0, 'localhost', () => {
//             resolve(server);
//         });
//     })
// });

// // it('should open the Add Job modal and submit a job', async function () {
// //     try {
// //         const baseUrl = 'http://localhost:5055'; // replace 'yourPort' with the actual port

// //         // Navigate to the page where the "Add Job" button is located
// //         await driver.get(baseUrl + '/instrumented/home.html'); // replace 'yourPage.html' with the actual page

// //         // Locate the "Add Job" button
// //         const addJobButton = await driver.findElement(By.id('addJobButton'));

// //         // Verify that the button exists on the page
// //         expect(addJobButton).to.exist;

// //         // Click the "Add Job" button
// //         await addJobButton.click();

// //         // Wait for the modal to appear (modify the timeout if needed)
// //         const modalTitleElement = await driver.findElement(By.id('addJobModalLabel'));
// //         await driver.wait(until.elementIsVisible(modalTitleElement), 5000);

// //         // Fill in the form fields
// //         await driver.findElement(By.id('jobName')).sendKeys('Sample Job');
// //         await driver.findElement(By.id('company')).sendKeys('Sample Company');
// //         await driver.findElement(By.id('location')).sendKeys('Sample Location');
// //         await driver.findElement(By.id('description')).sendKeys('Sample Description');
// //         await driver.findElement(By.id('contact')).sendKeys('Sample Contact');

// //         // Submit the form
// //         const addJobButtonInModal = await driver.findElement(By.id('addJobModalButton'));
// //         await addJobButtonInModal.click();

// //         // Optionally, add assertions to check for successful submission

// //         console.log('Add Job modal opened and job submitted successfully');
// //     } catch (error) {
// //         console.error('Error occurred during the test: ', error);
// //     }
// // });

// after(async function () {
//     await driver.quit();
//     await server.close();
//     process.exit(0);
// }); 