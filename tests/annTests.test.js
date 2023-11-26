const { describe, it } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;
const { deleteUser } = require('../utils/UserUtil')
const { viewJob, addJobs } = require('../utils/JobsUtil')

describe('Testing Delete User Function', () => {
    const userFilePath = 'utils/users.json';
    var orgContent = "";

    beforeEach(async () => {
        orgContent = await fs.readFile(userFilePath, 'utf8');
        orgContent = JSON.parse(orgContent);
    });

    afterEach(async () => {
        orgContent = await fs.writeFile(userFilePath, JSON.stringify(orgContent), 'utf8');

    });



    it("Should delete a user successfully", async () => {
        // Create a test user to delete
        const testUser = {
            body:{
                name: "testUser",
                password: "Pas01@#&"
            }
            
        };

        // Add the test user to the users.json file
        await addTestUser(testUser);

        // Call the deleteUser function to delete the test user
        const response = await deleteUser(testUser.name, testUser.password);

        // Verify the response
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal(`User '${testUser.name}' deleted successfully.`);

        // Verify that the user is deleted from the users.json file
        const updatedUsers = await readJSON(userFilePath);
        const deletedUser = updatedUsers.find(user => user.name === testUser.name);
        expect(deletedUser).to.be.undefined;
    });

    it("Should handle incorrect password during user deletion", async () => {
        // Create a test user to delete
        const testUser = {
            name: "testUser",
            password: "testPassword"
        };

        // Add the test user to the users.json file
        await addTestUser(testUser);

        // Call the deleteUser function with an incorrect password
        const response = await deleteUser(testUser.name, "incorrectPassword");

        // Verify the response
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Incorrect password. Deletion failed.');

        // Verify that the user is not deleted from the users.json file
        const updatedUsers = await readJSON(userFilePath);
        const deletedUser = updatedUsers.find(user => user.name === testUser.name);
        expect(deletedUser).to.exist;
    });

    it("Should handle user not found during deletion", async () => {
        // Call the deleteUser function for a non-existent user
        const response = await deleteUserRequest("nonExistentUser", "somePassword");

        // Verify the response
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal("User 'nonExistentUser' not found.");
    });

    describe('viewJobs Function', () => {
        it('Should return all jobs', async () => {
            const response = await viewJobs({}, {});
            expect(response.status).to.equal(201); // Assuming you return 201 for success
            expect(response.body).to.deep.equal(orgJobsContent);
        });

    });

    describe('addJobs Function', () => {
        it('Should add a new job', async () => {
            const newJob = {
                jobName: 'Software Developer',
                company: 'TechCo',
                location: 'City',
                description: 'Job description here.',
                contact: 'contact@techco.com'
            };

            const response = await addJobs({ body: newJob }, {});
            expect(response.status).to.equal(201); // Assuming you return 201 for success

            // Verify that the new job is added to the jobs.json file
            const updatedJobs = await fs.readFile(jobsFilePath, 'utf8');
            const updatedJobsJson = JSON.parse(updatedJobs);
            expect(updatedJobsJson).to.deep.include(newJob);
        });

        
    });


});
