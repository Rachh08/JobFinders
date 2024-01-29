const { describe, it } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;
const { register } = require('../utils/UserUtil');
const { searchJobs } = require('../utils/JobsUtil');

describe('Testing Register Function', () => {
    const usersFilePath = 'utils/users.json';
    let orgContent = '';

    beforeEach(async () => {
        try {
            orgContent = await fs.readFile(usersFilePath, 'utf8');
            orgContent = JSON.parse(orgContent);
        } catch (error) {
            // Handle error (e.g., log it, throw it, etc.)
            console.error('Error reading file:', error);
        }
    });

    afterEach(async () => {
        try {
            await fs.writeFile(usersFilePath, JSON.stringify(orgContent), 'utf8');
        } catch (error) {
            // Handle error (e.g., log it, throw it, etc.)
            console.error('Error writing file:', error);
        }
    });

    it('Should register a new user successfully and return the correct response', async () => {
        const req = {
            body: {
                email: 'rachel@gmail.com',
                password: 'T06ryuu@#&',
                name: 'Rach',
                mobile: '87821800',
            },
        };

        const res = {
            status: function (code) {
                expect(code).to.equal(201);
                return this;
            },
            json: function (data) {
                // Check for both error response and successful registration
                // if (data.message) {
                // successful registration message
                // expect(data.message).to.equal('Register successful!');
                expect(data).to.have.lengthOf(orgContent.length + 1);
                expect(data[orgContent.length].email).to.equal(req.body.email);
                expect(data[orgContent.length].password).to.equal(req.body.password);
                // } 
                // else {
                //     // If there is no 'message' property, assume it's a successful registration
                //     // Your assertions for the registration data here
                // }
            },
        };

        // Call your register function
        await register(req, res);
    });

    it('Should successfully register with valid user information', async () => {
        const req = {
            body: {
                // Valid user information
                // Adjust the input based on your actual registration endpoint
                email: 'test@example.com',
                password: 'StrongPassword123!',
                name: 'John Doe',
                mobile: '12345678',
            },
        };

        const res = {
            status: function (code) {
                return this;
            },
            json: function (data) {
                // Add assertions based on your expected response for a successful registration
                expect(data.message).to.equal('Register successful!');
            },
        };

        // Call your register function
        try {
            await register(req, res);
        } catch (error) {
            // Handle any errors during registration
            console.error('Error during registration:', error);
        }
    });
});

describe('Testing searchJobs Function', () => {
    it('Should return matching jobs for a valid query', async () => {

        const validQuery = 'developer';
        // Provide a valid search query
        const req = {
            body: {
                q: validQuery,
            },
        };

        const res = {
            status: function (code) {
                // Expecting a successful response code
                // expect(code).to.equal(500);
                expect(code).to.equal(200);
                return this;
            },
            json: function (data) {
                // Expecting data to be an array (matching jobs)
                // expect(data).to.have.property('message');
                expect(data.length).to.greaterThan(0);
            },
        };

        // Call searchJobs function
        await searchJobs(req, res);
    });

    // it('Should return a validation error for weak password', async () => {
    //     const invalidQuery = 'invalidquery'; // Provide a query with no matching jobs
    //     const req = {
    //         body: {
    //             q: invalidQuery,
    //         },
    //     };

    //     const res = {
    //         status: function (code) {
    //             expect(code).to.equal(400);
    //             return this;
    //         },
    //         json: function (data) {
    //             expect(data.message).to.include('Validation error');
    //         },
    //     };

    //     // Call your register function
    //     await register(req, res);
    // });


    it('Should return 400 for an invalid search query', async () => {
        const invalidQuery = '123invalid'; // Provide an invalid query (contains numbers)
        const req = {
            body: {
                q: invalidQuery,
            },
        };

        const res = {
            status: function (code) {
                // Expecting a bad request response code
                expect(code).to.equal(400);
                return this;
            },
            json: function (data) {
                // Expecting a message about an invalid search query
                console.log(data.error.message);
                expect(data.error.message).to.equal('Search query should only contain letters and spaces.');
            },
        };

        // Call your searchJobs function
        await searchJobs(req, res);
    });
});

it('Should return a validation error for partially filled registration form', async () => {
    const req = {
        body: {
            // Include only some fields, leaving others empty
            name: 'mabel',
            email: '',
            password: 'Ty07456@',
            mobile: '64678268'
        },
    };

    const res = {
        status: function (code) {
            this.statusCode = code;
            return this;
        },
        json: function (data) {
            expect(this.statusCode).to.equal(400);
            expect(data.message).to.equal('Validation error: All fields are required for registration.');
        },
    };

    // Call your register function
    await register(req, res);
});

it('Should return a validation error for weak password', async () => {
    const req = {
        body: {
            email: 'rachel@gmail.com',
            password: 'weak',  // Providing a weak password intentionally for this test
            name: 'Rach',
            mobile: '87821800',
        },
    };
    const res = {
        status: function (code) {
            // Update the expected status code to 400
            expect(code).to.equal(400);
            return this;
        },
        json: function (data) {
            expect(data.message).to.include('Validation error');
        },
    };

    // Call your register function
    await register(req, res);
});