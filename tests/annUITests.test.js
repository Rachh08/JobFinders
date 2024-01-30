const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it} = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;

const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless');

const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

var server;
var counter = 0;
before(async function (){
    server = await new Promise((resolve)=>{
        server = app.listen(0, 'localhost', () => {
            resolve(server);
        });
    })
});

describe('Testing Home Page UI - View Jobs', function (){

    it('Should have the correct title', async function (){
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented/home.html';
        this.timeout(100000);
        await driver.get(baseUrl);
        const title = await driver.getTitle();
        expect(title).to.equal('Job Finders');
    });
});

// it('Should display error if data is not fetched', async function(){
//     const baseUrl = 'http://localhost:' + server.address().port + '/instrumented/home.html';
//     await driver.get(baseUrl);

// })

after( async function (){
    await driver.quit();
    await server.close();
    process.exit(0);
});






//test for delete
//test for view jobs
//test for add jobs
//implement it also
