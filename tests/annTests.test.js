const { describe, it } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const fs = require('fs').promises;
const { readJSON, deleteUser, writeJSON } = require('../utils/UserUtil.js')
const { viewJobs, addJobs } = require('../utils/JobsUtil.js')


describe('Testing Add Job Functions', () => {
    const jobFilePath = 'utils/jobs.json';
    var orgContent = "";

    beforeEach(async () => {
        orgContent = await fs.readFile(jobFilePath, 'utf8');
        orgContent = JSON.parse(orgContent);
    });

    afterEach(async () => {
        await fs.writeFile(jobFilePath, JSON.stringify(orgContent), 'utf8');
    });

    it("Should add a new job successfully", async () => {
        const req = {
            body: {
                jobName: " Dancer",
                company: "Dancers Company",
                location: "Dance Studio",
                description: "Dancing and laughing",
                contact: " shiju@exam.com"
            },

        };

        const res = {
            status: function (code) {
                expect(code).to.equal(201);
                return this;
            },
            json: function (data) {
                expect(data).to.be.an('array');
            },
        };

        await addJobs(req, res);
    });


    it('Should handle empty input fields', async () => {
        const req = {
            body: {
                // Empty body, should trigger a 400 status
            },
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(400);
                return this;
            },

            json: function (data) {
                expect(data).to.have.property('message').that.includes('All input fields must be filled.');
            },
        };
        await addJobs(req, res);
    });
    it('Should handle invalid jobName and company fields', async () => {
        const req = {
            body: {
                jobName: 'Invalid@Name123',  // Invalid characters, should trigger a 400 status
                company: 'Invalid$Company',
                location: 'Invalid Location',
                description: 'Some description',
                contact: 'invalid@email.com',
            },
        };

        const res = {
            status: function (code) {
                expect(code).to.equal(400);
                return this;
            },
            json: function (data) {
                expect(data).to.have.property('message').that.includes('Job name and company must contain alphabets only');
            },
        };
        await addJobs(req, res);
    });
    it('Should handle invalid contact field', async () => {
        const req = {
            body: {
                jobName: 'Valid Job',
                company: 'Valid Company',
                location: 'Valid Location',
                description: 'Some description',
                contact: 'invalid-email',  // Invalid email format, should trigger a 400 status
            },
        };

        const res = {
            status: function (code) {
                expect(code).to.equal(400);
                return this;
            },
            json: function (data) {
                expect(data).to.have.property('message').that.includes('Provide valid contact details: email');
            },
        };

        await addJobs(req, res);
    });

});

describe('Delete User Function Testing', ()=>{
    const userFilePath = 'utils/user.json';
    var orgContent = "";

    beforeEach(async () => {
        orgContent = await fs.readFile(userFilePathFilePath, 'utf8');
        orgContent = JSON.parse(orgContent);
    });

    afterEach(async () => {
        await fs.writeFile(userFilePath, JSON.stringify(orgContent), 'utf8');
    });
})