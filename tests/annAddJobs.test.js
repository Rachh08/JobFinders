// //Error handling for view jobs - unsuccessful
// // it('Should display error message if the data is unloaded', async function () {
// //     let tableText; // Declare the variable outside the try block

// //     try {
// //         const baseUrl = 'http://localhost:' + server.address().port + '/instrumented/home.html';
// //         await driver.get(baseUrl);

// //         // Simulate a server issue by rejecting the promise with a server error object
// //         await driver.executeScript("window.viewJobs = function() { return Promise.reject({ status: 500, message: 'Internal Server Error' }); }");
// //         await driver.sleep(1000);

// //         const jobTable = await driver.wait(until.elementLocated(By.id('jobTable')), 5000);
// //         const isDisplayed = await jobTable.isDisplayed();
// //         expect(isDisplayed).to.be.true;

// //         //const jobTable = await driver.findElement({ id: 'jobTable' });
// //         tableText = await jobTable.getText();

// //         expect(tableText.includes('Error fetching data. Please try again later.')).to.be.true;
// //     } catch (error) {
// //         console.log('Actual content:', tableText);
// //         console.error('Test failed with error:', error);
// //         throw error;
// //     }
// // });


// describe('addJob function', function () {
//     describe('Testing Home Page UI - Add jobs', () => {
//         it('Add Job Modal works efficiently', async function () {
//             try {
//                 this.timeout(100000);
//                 const baseUrl = 'http://localhost:' + server.address().port + '/instrumented/home.html';
//                 await driver.get(baseUrl);

//                 // User clicks add job and is navigated to addJobModal, addJobModal opens
//                 const addButton = await driver.findElement(By.xpath("//button[@data-toggle='modal' and @data-target='#addJobModal']"));
//                 await addButton.click();

//                 const addJobModal = await driver.findElement(By.id('addJobModal'));
//                 await driver.wait(until.elementIsVisible(addJobModal), 5000);
//                 console.log('Add Job Modal is opened');

//                 // User interacts with every field and inputs data
//                 // JobName
//                 const rName = await driver.findElement(By.id('jobName'));
//                 await rName.click();
//                 console.log('User can input name');
//                 await rName.sendKeys('Chef');


//                 const rCompany = await driver.findElement(By.id('company'));
//                 await rCompany.click();
//                 console.log('User can input company');
//                 await rCompany.sendKeys('Pastry');

//                 // Location
//                 const rLocation = await driver.findElement(By.id('location'));
//                 await rLocation.click();
//                 console.log('User can input location');
//                 await rLocation.sendKeys('Pastry Area');

//                 // Location
//                 const rDescript = await driver.findElement(By.id('description'));
//                 await rDescript.click();
//                 console.log('User can input description');
//                 await rDescript.sendKeys('Pastry and cakes will be made by you');

//                 // Contact
//                 const rContact = await driver.findElement(By.id('contact'));
//                 await rContact.click();
//                 console.log('User can input contact');
//                 await rContact.sendKeys('Pastry@gmail.com');

//                 // User clicks add job on the modal 
//                 const addButtonModal = await driver.findElement(By.xpath("//div[@class='modal-footer']//button[contains(text(), 'Add Job')]"));
//                 await addButtonModal.click();
//                 console.log('Clicking Add Job on Modal');

//                 // Wait for modal to close
//                 await driver.sleep(2000);

//                 // Wait for success message to be present
//                 const successMessageLocator = By.xpath("//p[@id='message' and contains(@class, 'text-success')]");
//                 await driver.wait(until.elementLocated(successMessageLocator), 10000); // Adjust the timeout as needed

//                 // Check for success message
//                 const successMessage = await driver.findElement();
//                 const successText = await successMessage.getText();
//                 expect(successText).to.equal('Added Job: Pastry Chef!');
//                 console.log('Add Job Modal test completed successfully');
//             } catch (error) {
//                 console.error('Error occurred during the test: ', error);

//                 // Capture a screenshot for further investigation
//                 const screenshot = await driver.takeScreenshot();
//                 const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
//                 const screenshotFileName = `error-screenshot-${timestamp}.png`;
//                 await require('fs').promises.writeFile(screenshotFileName, screenshot, 'base64');

//                 throw error;
//             }
//         });
//     });

//     it('should handle error response', function (done) {
//         const jsonData = { /* Your data here */ };

//         // Mock XMLHttpRequest
//         const mockRequest = sinon.stub(XMLHttpRequest.prototype, 'open');
//         mockRequest.returns(null);

//         const mockSend = sinon.stub(XMLHttpRequest.prototype, 'send');
//         mockSend.yields(JSON.stringify({ error: 'Job addition failed' }), { status: 500 });

//         addJob(jsonData);

//         // Assertions for error handling
//         setTimeout(function () {
//             const errorMessage = document.getElementById('message');
//             expect(errorMessage.innerHTML).to.equal('Unable to add Job!');

//             mockRequest.restore();
//             mockSend.restore();
//             done();
//         }, 100);
//     });
// });

