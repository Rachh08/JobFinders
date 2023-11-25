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
    const id = req.parmas.id;
    const password = req.body.password;
    const mobile = req.body.mobile;
    
    const allUsers = await readJSON('utils/users.json');

    var update = false;

    for (var i = 0; i < allUsers.length; i++) {
        var currentUser = allUsers[i];
        if (currentUser.id == id){
            allUsers[i].password = password;
            allUsers[i].mobile = mobile;

            update = true;
        }   
    }

    if (update) {
        await fs.writeFile('utils/users.json', JSON.stringify(allUsers), 'utf8');
        return res.status(201).json({ message: 'User details updated successfully!' });
    } else {
        return res.status(500).json({ message: 'Unable to update user details!' });
    }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

module.exports = {
readJSON, writeJSON, updateUserdetails
};