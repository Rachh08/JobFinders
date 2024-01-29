const { describe, it } = require('mocha');
const { expect } = require('chai');

const fs = require('fs').promises;
const { login, updateUser } = require('../utils/UserUtil')

describe('Testing Login Function', () => {
    const usersFilePath = 'utils/users.json';
    var orgContent = "";

    beforeEach(async () => {
        orgContent = await fs.readFile(usersFilePath, 'utf8');
        orgContent = JSON.parse(orgContent);
    });

    it('Should login successfully', async () => {
        const req = {
            body: {
                email: orgContent[0].email,
                password: orgContent[0].password,
            },
        };

        const res = {
            status: function (code) {
                expect(code).to.equal(201);
                return this;
            },
            json: function (data) {
                expect(data.message).to.equal('Login successful!');
            },
        };

        await login(req, res);
    });

    it('Should shows wrong email and password', async () => {
        const req = {
            body: {
                email: 'asde#email.com',
                password: 'abcdefg',
            },
        };

        const res = {
            status: function (code) {
                expect(code).to.equal(500);
                return this;
            },
            json: function (data) {
                expect(data.message).to.equal('Wrong Email and Password!');
            },
        };
        await login(req, res);
    });

    it('Should shows there is no input in email and password', async () => {
        const req = {
            body: {
                email: 'dddd@gmail.com',
                password: '',
            },
        };

        const res = {
            status: function (code) {
                expect(code).to.equal(400);
                return this;
            },
            json: function (data) {
                expect(data.message).to.equal('All input fields must be filled.');
            },
        };
        await login(req, res);
    });
});

describe('Testing Update Function', () => {
    const usersFilePath = 'utils/users.json';
    var orgContent = "";

    beforeEach(async () => {
        orgContent = await fs.readFile(usersFilePath, 'utf8');
        orgContent = JSON.parse(orgContent);
    });
    
    afterEach(async () => {
        await fs.writeFile(usersFilePath, JSON.stringify(orgContent), 'utf8');
    });

    it('Should shows user details has been successfully updated', async () => {
        const req = {
            body: {
                password: 'P!rfgrfd',
                mobile: '98877655',
            },
            params: {
                id: orgContent[0].id
            }
        };

        const res = {
            status: function (code) {
                expect(code).to.equal(201);
                return this;
            },
            json: function (data) {
                expect(data.message).to.equal('User details has been successfully updated!');
            },
        };
        await updateUser(req, res);
    });

    it('Should shows password should not have less than 8 digits', async () => {
        const req = {
            body: {
                password: 'pssd?Ps',
                mobile: '44444444',
            },
            params: {
                id: orgContent[0].id
            }
        };

        const res = {
            status: function (code) {
                expect(code).to.equal(500);
                return this;
            },
            json: function (data) {
                expect(data.message).to.equal('Password should have at least 8 digits!');
            },
        };
        await updateUser(req, res);
    });

    it('Should shows User details has been updated unsuccessfully! ', async () => {
        const req = {
            body: {
                password: '@ddddErr',
                mobile: '44444444'
            },
            params: {
                id: "zzz"
            }
        };

        const res = {
            status: function (code) {
                expect(code).to.equal(500);
                return this;
            },
            json: function (data) {
                expect(data.message).to.equal('User details has not been updated successfully!');
            },
        };
        await updateUser(req, res);
    });
});