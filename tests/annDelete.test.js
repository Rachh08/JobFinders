const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;

const chrome = require('selenium-webdriver/chrome');
const e = require('express');
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

describe('User Html Page- Delete User', function () {
    it('Should have the correct title', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented/user.html';
        this.timeout(100000);
        await driver.get(baseUrl);
        const title = await driver.getTitle();
        expect(title).to.equal('Job Finders');
    });

    it('should load user details table on page', async function () {
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented/user.html';
        await driver.get(baseUrl);
    
        // Assuming there is a delay for the table to be loaded, adjust the timeout accordingly
        await driver.sleep(1000);
    
        // Assuming the table has an ID 'tableContent', update it accordingly
        const tableContentInnerHtml = await driver.executeScript("return document.getElementById('tableContent').innerHTML");
    
        // Check if the inner HTML is not empty
        expect(tableContentInnerHtml).to.not.be.empty;
    });
    
});

after(async function () {
    await driver.quit();
    await server.close();
    process.exit(0);
});