const { User } = require('../models/User');
const fs = require('fs').promises;
async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) { console.error(err); throw err; }
}
async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);
        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) { console.error(err); throw err; }
}
async function register(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const mobile = req.body.mobile;

// Checks if the email string does not include the '@'and '.com' substring, checks if the length of the password string is less than 8 characters
// Checks if the password string contains at least one uppercase letter and one special character, checks if the name string contains only letters
// Checks if the mobile string is not an empty string or does not contain only whitespace, checks if the mobile string contains exactly 8 digits

        if (!email.includes('@') || !email.includes('.com') || password.length < 8 ||!/(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(password)
        ||!/^[a-zA-Z]+$/.test(name) ||!mobile.trim()|| !/^\d{8}$/.test(mobile)) {
            return res.status(500).json({ message: 'Validation error' });
        } else {
            const newUser = new User(email, password, name, mobile);
            const updatedUsers = await writeJSON(newUser, 'utils/users.json');
            return res.status(201).json(updatedUsers);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { readJSON, writeJSON, register };