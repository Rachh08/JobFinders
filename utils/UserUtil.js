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
    
    const updateUser = updateUser(password, mobile);
    const updateUserdetails = await writeJSON(updateUser, 'utils/users.json');
    return res.status(201).json(updateUser);
    } 
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
    

async function deleteUser(req, res) {
    try {
        const usernameToDelete = req.body.name;
        const enteredPassword = req.body.password;

        const allUsers = await readJSON('utils/users.json');
        const userToDeleteIndex = allUsers.findIndex(user => user.name === usernameToDelete);

        if (userToDeleteIndex !== -1) {
            const userToDelete = allUsers[userToDeleteIndex];

            // Check if the entered password matches the user's password
            if (enteredPassword === userToDelete.password) {
                allUsers.splice(userToDeleteIndex, 1);
                await fs.writeFile('utils/users.json', JSON.stringify(allUsers), 'utf8');
                return res.status(200).json({ message: `User '${usernameToDelete}' deleted successfully.` });
            } else {
                return res.status(401).json({ message: 'Incorrect password. Deletion failed.' });
            }
        } else {
            return res.status(404).json({ message: `User '${usernameToDelete}' not found.` });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}




module.exports = {
    readJSON, writeJSON, updateUserdetails, deleteUser
    };
    