const { describe, it } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;
const { register, login } = require('../utils/UserUtil');

describe('Testing Register Function', () => {
    const usersFilePath = 'utils/users.json';
    let orgContent = '';

    beforeEach(async () => {
        orgContent = await fs.readFile(usersFilePath, 'utf8');
        orgContent = JSON.parse(orgContent);
    });

    afterEach(async () => {
        await fs.writeFile(usersFilePath, JSON.stringify(orgContent), 'utf8');
    });

    it('Should register a new user successfully', async () => {
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
                if (data.message) {
                    // If there is a 'message' property, assume it's an error response
                    expect(data.message).to.equal('Register successful!');
                } else {
                    // If there is no 'message' property, assume it's a successful registration
                    expect(data).to.have.lengthOf(orgContent.length + 1);
                    expect(data[orgContent.length].email).to.equal(req.body.email);
                    expect(data[orgContent.length].password).to.equal(req.body.password);
                    expect(data[orgContent.length].name).to.equal(req.body.name);
                    expect(data[orgContent.length].mobile).to.equal(req.body.mobile);
                }
            },
        };
    
        // Call your register function
        await register(req, res);
    });
})    