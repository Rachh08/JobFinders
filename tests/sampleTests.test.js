const { describe, it } = require('mocha');
const { expect } = require('chai');
const { register } = require('../utils/UserUtil');

describe('User Registration Tests', () => {
    it('Should return a validation error for partially filled registration form', async () => {
        const result = await register({
            body: {
                // Partially filled registration form (missing required fields)
                // Adjust the input based on your actual registration endpoint
                email: 'test@example.com',
            },
        });
        expect(result.status).to.equal(400);
        expect(result).to.have.property('body').to.have.property('message').to.equal('Validation error');
    });

    it('Should return a validation error for weak password', async () => {
        const result = await register({
            body: {
                // Valid user information with a weak password
                // Adjust the input based on your actual registration endpoint
                email: 'test@example.com',
                password: 'weak',
                name: 'John Doe',
                mobile: '12345678',
            },
        });
        expect(result.status).to.equal(500);
        expect(result).to.have.property('body').to.have.property('message').to.equal('Validation error');
    });

    it('Should successfully register with valid user information', async () => {
        const result = await register({
            body: {
                // Valid user information
                // Adjust the input based on your actual registration endpoint
                email: 'test@example.com',
                password: 'StrongPassword123!',
                name: 'John Doe',
                mobile: '12345678',
            },
        });
        expect(result.status).to.equal(201);
        // Add additional assertions based on your expected response for a successful registration
    });
});
