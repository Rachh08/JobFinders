const { describe, it } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const fs = require('fs').promises;
const { readJSON, deleteUser, writeJSON } = require('../utils/UserUtil.js')
const { viewJobs, addJobs } = require('../utils/JobsUtil.js')

describe("Testing View Job Functions",  () => {
    const jobFilePath = 'utils/jobs.json';
  

    it("Should view all Jobs successfully", async () => {
        const req = {};

        const res = {
            status: function (code) {
                expect(code).to.equal(201);
                return this;
            },

            json: function (data) {
                expect(Array.isArray(data)).to.be.true;
            },

        };

        await viewJobs(req, res);
        });

    });



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

describe('Delete User Function Testing', () => {
    // Helper function to create a mock user for testing
    const createMockUser = (name, password) => ({ name, password });

    // Helper function to create a mock request with parameters
    const createMockRequest = (name, password) => ({
        params: { name },
        body: { password },
    });

    // Helper function to create a mock response
    const createMockResponse = () => {
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        return res;
    };

    it('should delete user successfully', async () => {
        // Arrange
        const mockUser = createMockUser('testUser', 'testPassword');
        const mockRequest = createMockRequest('testUser', 'testPassword');
        const mockResponse = createMockResponse();

        // Mock readJSON to return a list with the mock user
        sinon.stub(fs, 'readFile').resolves(JSON.stringify([mockUser]));

        // Act
        await deleteUser(mockRequest, mockResponse);

        // Assert
        sinon.assert.calledWith(mockResponse.status, 200);
        sinon.assert.calledWith(mockResponse.json, { message: `User 'testUser' deleted successfully.` });

        // Cleanup
        sinon.restore();
    });

    it('should handle incorrect password', async () => {
        // Arrange
        const mockUser = createMockUser('testUser', 'testPassword');
        const mockRequest = createMockRequest('testUser', 'wrongPassword');
        const mockResponse = createMockResponse();

        // Mock readJSON to return a list with the mock user
        sinon.stub(fs, 'readFile').resolves(JSON.stringify([mockUser]));

        // Act
        await deleteUser(mockRequest, mockResponse);

        // Assert
        sinon.assert.calledWith(mockResponse.status, 401);
        sinon.assert.calledWith(mockResponse.json, { message: 'Incorrect password. Deletion failed.' });

        // Cleanup
        sinon.restore();
    });

    it('should handle user not found', async () => {
        // Arrange
        const mockRequest = createMockRequest('nonexistentUser', 'password');
        const mockResponse = createMockResponse();

        // Mock readJSON to return an empty list
        sinon.stub(fs, 'readFile').resolves('[]');

        // Act
        await deleteUser(mockRequest, mockResponse);

        // Assert
        sinon.assert.calledWith(mockResponse.status, 404);
        sinon.assert.calledWith(mockResponse.json, { message: 'User \'nonexistentUser\' not found.' });

        // Cleanup
        sinon.restore();
    });

});

