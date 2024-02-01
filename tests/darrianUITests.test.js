const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;

const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless');
const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

var server;
var counter = 0;
before(async function () {
    server = await new Promise((resolve) => {
        server = app.listen(0, 'localhost', () => {
            resolve(server);
        });
    })
});

describe('Testing Login UI', function () {
    it('Should bring user to home page', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';
        this.timeout(10000000);
        await driver.get(baseUrl);
        //Locate and interact with email field
        const emailElement = await driver.findElement(By.id('email'));
        await emailElement.click(); // Click on the element
        await emailElement.sendKeys('john@email.com');
        //Locate and interact with password field
        const passwordElement = await driver.findElement(By.id('password'));
        await passwordElement.click(); // Click on the element
        await passwordElement.sendKeys('E@EEEEee');
        //Locate and interact with Login button
        const loginButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
        await loginButton.click();
        //Wait for the page to be redirected
        await driver.manage().setTimeouts({ implicit: 2000 });
        //Ensure the URL matches the expected URL
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal('http://localhost:' + server.address().port + '/home.html');
    });

    it('Should show error message - All input fields must be filled', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';
        this.timeout(100000); 
        await driver.get(baseUrl);
        // Locate and interact with the email field
        const emailElement = await driver.findElement(By.id('email'));
        await emailElement.click(); // Click on the element
        await emailElement.sendKeys('john@email.com');
        // Locate and interact with the Login button
        const loginButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
        await loginButton.click();
        // Locate error and retrieve text
        const errorMessage = await driver.findElement(By.id('error')).getText();
        // Ensure error message contains the expected text
        expect(errorMessage).to.equal('All input fields must be filled!');
    });

    it('Should show error message - Wrong Email and Password', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';
        await driver.get(baseUrl);
        // Locate and interact with the email field
        const emailElement = await driver.findElement(By.id('email'));
        await emailElement.click(); // Click on the element
        await emailElement.sendKeys('john@email.com');
        // Locate and interact with the password field
        const passwordElement = await driver.findElement(By.id('password'));
        await passwordElement.click(); // Click on the element
        await passwordElement.sendKeys('au8877i');
        // Locate and interact with the Login button
        const loginButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
        await loginButton.click();
        // Locate error and retrieve the text
        const errorMessage = await driver.findElement(By.id('error')).getText();
        const errorStyle = await driver.findElement(By.id('error')).getAttribute('class');
        // Ensure that the  error message contains the expected text and style
        expect(errorMessage).to.equal('Wrong Email and Password!');
        expect(errorStyle).to.equal('text-danger');
        });
});

describe('Testing Update User UI', function () {
    it('Should allow the user to update user details', async function () {
        this.timeout(10000000);
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';
        await driver.get(baseUrl);
        // Locate and interact with the email field
        const emailElement = await driver.findElement(By.id('email'));
        await emailElement.click(); // Click on the element
        await emailElement.sendKeys('john@email.com');
        // Locate and interact with the password field
        const passwordElement = await driver.findElement(By.id('password'));
        await passwordElement.click(); // Click on the element
        await passwordElement.sendKeys('E@EEEEee');
        // Locate and interact with the Login button
        const loginButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
        await loginButton.click();
        // Wait for page to redirected to home.html
        await driver.wait(until.urlIs(baseUrl + '/home.html'), 10000000);
        //Locate and interact with user button
        const userButton = await driver.findElement(By.xpath('//button[text()="User"]'));
        await userButton.click();
        //Wait for page to redirected to user.html
        await driver.wait(until.urlIs(baseUrl + '/user.html'), 10000000);
        // Assert that the URL matches the expected URL
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal('http://localhost:' + server.address().port + '/instrumented/user.html');
        // Locate and interact with the Login button
        const updateButton = await driver.findElement(By.xpath("//div[@class='btn btn-warning']//button[contains(text(), 'Update')]"));
        await updateButton.click();
        // Wait for the modal to load
        const updateUserModal = await driver.findElement(By.id('updateUserModal'));
        await driver.wait(until.elementIsVisible(updateUserModal), 10000000);
        // Locate and interact with password field
        const updatePasswordElement = await driver.findElement(By.id('password'));
        await updatePasswordElement.click(); // Click on the element
        await updatePasswordElement.sendKeys('Q@ffgred');
        // Locate and interact with mobile field
        const updateMobileElement = await driver.findElement(By.id('mobile'));
        await updateMobileElement.click(); // Click on the element
        await updateMobileElement.sendKeys('88776655');
        // Locate the table element and locate all tr within table
        const tableBefore = await driver.findElement(By.id('1888877654897654'));
        const rowsBefore = await tableBefore.findElements(By.id('tr')); 
        const beforeCount = rowsBefore.length;
        // Locate and interact with update button
        const updateButtonModal = await driver.findElement(By.xpath("//div[@class='modal-footer']//button[contains(text(), 'Update User Details')]"));
        await updateButtonModal.click();
        // Wait for the modal to dismiss
        await driver.manage().setTimeouts({ implicit: 5000 });
        // Locate the id element and locate all id within table
        const tableUpdated = await driver.findElement(By.id('1888877654897654'));
        const rowsUpdated = await tableUpdated.findElements(By.id('tr'));
        // Assert that the table rows has been updated
        expect(rowsUpdated.length).to.equal(beforeCount);
    });

    it('Should show error message - Password should contain at least one upper case letter and special character', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented/user.html';
        this.timeout(10000000);
        await driver.get(baseUrl);
        // Locate and interact with update button
        const updateButton = await driver.findElement(By.xpath("//div[@class='btn btn-warning']//button[contains(text(), 'Update')]"));
        await updateButton.click();
        // Wait for the modal to load
        const updateUserModal = await driver.findElement(By.id('updateUserModal'));
        await driver.wait(until.elementIsVisible(updateUserModal), 10000000);
        // Locate and interact with the email field
        const updatePasswordElement = await driver.findElement(By.id('password'));
        await updatePasswordElement.click(); // Click on the element
        await updatePasswordElement.sendKeys('hgyyttdd');
        // Locate and interact with the password field
        const updateMobileElement = await driver.findElement(By.id('mobile'));
        await updateMobileElement.click(); // Click on the element
        await updateMobileElement.sendKeys('88776654');
        // Locate and interact with update button
        const updateButtonModal = await driver.findElement(By.xpath("//div[@class='modal-footer']//button[contains(text(), 'Update User Details')]"));
        await updateButtonModal.click();
        // Wait for the modal to dismiss
        await driver.manage().setTimeouts({ implicit: 5000 });
        // Locate error and retrieve the text
        const errorMessage = await driver.findElement(By.id('error')).getText();
        const errorStyle = await driver.findElement(By.id('error')).getAttribute('class');
        // Ensure that the  error message contains the expected text and style
        expect(errorMessage).to.equal('Password should contain at least one upper case letter and special character!');
        expect(errorStyle).to.equal('text-danger');
        });

    it('Should show error message - All input fields must be filled', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented/user.html';
        this.timeout(10000000);
        await driver.get(baseUrl);
        // Locate and interact with update button
        const updateButton = await driver.findElement(By.xpath("//div[@class='btn btn-warning']//button[contains(text(), 'Update')]"));
        await updateButton.click();
        // Wait for the modal to load
        const updateUserModal = await driver.findElement(By.id('updateUserModal'));
        await driver.wait(until.elementIsVisible(updateUserModal), 10000000);
        // Locate and interact with the email field
        const updatePasswordElement = await driver.findElement(By.id('password'));
        await updatePasswordElement.click(); // Click on the element
        await updatePasswordElement.sendKeys('H$eyttdd'); 
        const updateButtonModal = await driver.findElement(By.xpath("//div[@class='modal-footer']//button[contains(text(), 'Update User Details')]"));
        await updateButtonModal.click();
        // Wait for the modal to dismiss
        await driver.manage().setTimeouts({ implicit: 5000 });
        // Locate error and retrieve the text
        const errorMessage = await driver.findElement(By.id('error')).getText();
        const errorStyle = await driver.findElement(By.id('error')).getAttribute('class');
        // Ensure that the  error message contains the expected text and style
        expect(errorMessage).to.equal('All input fields must be filled!');
        expect(errorStyle).to.equal('text-danger');
    });
});

afterEach(async function () {
    await driver.executeScript('return window.__coverage__;').then(async (coverageData) => {
        if (coverageData) {
            // Save coverage data to a file
            await fs.writeFile('coverage-frontend/coverageloginupdate'+ counter++ + '.json', JSON.stringify(coverageData), (err) => {
                if (err) {
                    console.error('Error writing coverage data:', err);
                } else {
                    console.log('Coverage data written to coverage.json');
                }
            });
        }
    });
});
after(async function () {
    await driver.quit();
    await server.close();
    process.exit(0);
});