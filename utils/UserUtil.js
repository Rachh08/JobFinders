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

async function updateUserdetails(req, res) {
    try {
    const password = req.body.password;
    const mobile = req.body.mobile;
    
    const updateUser = update User(password, mobile);
    const updateUserdetails = await writeJSON(updateUser, 'utils/users.json');
    return res.status(201).json(updateUser);
    } 
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
    
module.exports = {
readJSON, writeJSON, updateUserdetails
};