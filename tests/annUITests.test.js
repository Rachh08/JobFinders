// const { app } = require('../index');
// const { Builder, By, Key, until } = require('selenium-webdriver');
// const { describe, it } = require('mocha');
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

// describe('Testing Home Page UI - View Jobs', function () {

//     it('Should have the correct title', async function () {
//         const baseUrl = 'http://localhost:' + server.address().port + '/instrumented/home.html';
//         this.timeout(100000);
//         await driver.get(baseUrl);
//         const title = await driver.getTitle();
//         expect(title).to.equal('Job Finders');
//     });

//     it('Should have the correct heading and logo', async function () {
//         const baseUrl = 'http://localhost:' + server.address().port + '/instrumented/home.html';
//         await driver.get(baseUrl);

//         // Wait for the h1 element to be present
//         const h1Element = await driver.wait(until.elementLocated(By.css('.box-1 h1')), 10000); // Increased timeout to 10 seconds

//         // Verify the title text
//         const text = await h1Element.getText();
//         //console.log('Title Text:', text);
//         expect(text).to.equal('JobFinders');

//         // Wait for the image element to be present
//         const imgElement = await driver.wait(until.elementLocated(By.css('.box-1 img')), 10000); // Increased timeout to 10 seconds

//         // Verify the alt attribute of the image
//         const altAttribute = await imgElement.getAttribute('alt');
//         //console.log('Alt Attribute:', altAttribute);
//         expect(altAttribute).to.equal('Job Finders logo');
//     });



//     it('Should load job data into the jobTable', async function () {
//         const baseUrl = 'http://localhost:' + server.address().port + '/instrumented/home.html';
//         await driver.get(baseUrl);

//         await driver.sleep(1000);
//         const jobTableHTML = await driver.executeScript("return document.getElementById('jobTable').innerHTML");

//         expect(jobTableHTML.includes('<td>1</td>')).to.be.true;
//         expect(jobTableHTML.includes('<td>Assistant Chef</td>')).to.be.true;
//         expect(jobTableHTML.includes('<td>Gordon Ramsay Kitchen</td>')).to.be.true;
//         expect(jobTableHTML.includes('<td>Gordon Ramsay Kitchen</td>')).to.be.true;
//         expect(jobTableHTML.includes('<td>Bedok Green</td>')).to.be.true;
//         expect(jobTableHTML.includes('<td>Cook delicious food and work under renown chef Gordon Ramsay. Training Provided. Send portfolio with resume. Thanks</td>')).to.be.true;
//         expect(jobTableHTML.includes('<td>littlechef@gmail.com</td>')).to.be.true;
//     });

//     // it('Should load job data into the jobTable', async function () {
//     //     const baseUrl = 'http://localhost:' + server.address().port + '/instrumented/home.html';
//     //     await driver.get(baseUrl);

//     //     // Mocking the fetch response for the viewResources function
//     //     const mockResponse = [
//     //         {
//     //             id: 1,
//     //             jobName: 'Assistant Chef',
//     //             company: 'Gordon Ramsay Kitchen',
//     //             location: 'Bedok Green',
//     //             description: 'Cook delicious food and work under renown chef Gordon Ramsay. Training Provided. Send portfolio with resume. Thanks',
//     //             contact: 'littlechef@gmail.com',
//     //         }
//     //         // Add more mock data if needed
//     //     ];

//     //     // Mock the fetch function to return the predefined response
//     //     global.fetch = jest.fn().mockResolvedValue({
//     //         json: () => Promise.resolve(mockResponse)
//     //     });

//     //     // Call the viewResources function
//     //     await driver.executeScript(viewResources);

//     //     // Wait for the jobTable to be populated
//     //     const jobTableHTML = await driver.wait(until.elementLocated(By.css('#jobTable')), 10000).then(element => element.getAttribute('innerHTML'));

//     //     // Perform assertions based on the mock response
//     //     expect(jobTableHTML.includes('<td>1</td>')).to.be.true;
//     //     expect(jobTableHTML.includes('<td>Assistant Chef</td>')).to.be.true;
//     //     expect(jobTableHTML.includes('<td>Gordon Ramsay Kitchen</td>')).to.be.true;
//     //     expect(jobTableHTML.includes('<td>Bedok Green</td>')).to.be.true;
//     //     expect(jobTableHTML.includes('<td>Cook delicious food and work under renown chef Gordon Ramsay. Training Provided. Send portfolio with resume. Thanks</td>')).to.be.true;
//     //     expect(jobTableHTML.includes('<td>littlechef@gmail.com</td>')).to.be.true;
//     // });

// });

// afterEach(async function () {
//     await driver.executeScript('return window.__coverage__;').then(async (coverageData) => {
//     if (coverageData) {
//     // Save coverage data to a file
//     await fs.writeFile('coverage-frontend/coverage'+ counter++ + '.json',
//     JSON.stringify(coverageData), (err) => {
//     if (err) {
//     console.error('Error writing coverage data:', err);
//     } else {
//     console.log('Coverage data written to coverage.json');
//     }
//     });
//     }
//     });
//     });

// after(async function () {
//     await driver.quit();
//     await server.close();
//     process.exit(0);
// });

