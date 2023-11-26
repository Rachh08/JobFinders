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

                expect(data).to.have.lengthOf(orgContent.length + 1);
                //checks if the email of the is equal to the email provided in the request body
                expect(data[orgContent.length].email).to.equal(req.body.email);
                //checks if the password is equal to the password provided in the request body
                expect(data[orgContent.length].password).to.equal(req.body.password);
                //checks if the password is equal to the password provided in the request body
                expect(data[orgContent.length].name).to.equal(req.body.name);
                //checks if the name is equal to the name provided in the request body
                expect(data[orgContent.length].mobile).to.equal(req.body.mobile);

            },
        };
        await register(req, res);
    });
});

