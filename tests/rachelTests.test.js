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
                if (data.message) {
                    // successful registration message
                    expect(data.message).to.equal('Register successful!');
                } else {
                    // If there is no 'message' property, assume it's a successful registration
                    // Your assertions for the registration data here
                }
            },
        };

        // Call your register function
        await register(req, res);
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
                    expect(code).to.equal(200);
                    return this;
                },
                json: function (data) {
                    // Expecting data to be an array (matching jobs)
                    expect(data).to.be.an('array');
                },
            };

            // Call searchJobs function
            await searchJobs(req, res);
        });

        it('Should return 404 for no matching jobs', async () => {
            const invalidQuery = 'invalidquery'; // Provide a query with no matching jobs
            const req = {
                body: {
                    q: invalidQuery,
                },
            };

            const res = {
                status: function (code) {
                    // Expecting a not found response code
                    expect(code).to.equal(404);
                    return this;
                },
                json: function (data) {
                    // Expecting a message about no matching jobs
                    expect(data).to.have.property('message').to.equal('No matching jobs found.');
                },
            };

            await searchJobs(req, res);
        });

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
                    expect(data).to.have.property('message').to.equal('Search query should only contain letters.');
                },
            };

            // Call your searchJobs function
            await searchJobs(req, res);
        });
    });
})