const { describe, it } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;

const { viewJobs } = require('../utils/JobsUtil')
describe('Testing Register Function', () => {
const usersFilePath = 'utils/users.json';
var orgContent = "";
beforeEach(async () => {
orgContent = await fs.readFile(usersFilePath, 'utf8');
orgContent = JSON.parse(orgContent);
});
afterEach(async () => {
await fs.writeFile(usersFilePath, JSON.stringify(orgContent), 'utf8');
});
});
describe('Testing Login Function', () => {
const usersFilePath = 'utils/users.json';
var orgContent = "";
beforeEach(async () => {
orgContent = await fs.readFile(usersFilePath, 'utf8');
orgContent = JSON.parse(orgContent);
});
});