const { User } = require('../models/User')
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

async function login(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const allUsers = await readJSON('utils/users.json');

        var validCredentials = false;

        // To allow user to 
        for (var i = 0; i < allUsers.length; i++) {
            var currUser = allUsers[i];
            if (currUser.email == email && currUser.password == password)
            validCredentials = true;
        }
        //if login is successful
        if (validCredentials) 
        {
            return res.status(201).json({ message: 'Login successful!' });
        } // if user only type in correct email 
          if (currUser.email == email  )
        {
           return res.status(500).json({message: 'Invalid password!'})
        } // if user only type in correct password 
          if (currUser.password == password )
        {
            return res.status(500).json({message: 'Invalid email!'})
        } //if user does not fill all input 
        if (!email || !password) {
            return res.status(400).json({ message: 'All input fields must be filled.' });
        } // if user type in both wrong email and password
         else {
        return res.status(500).json({ message: 'Wrong Email and Password!' });
        } 
    } catch (error) {
    return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    readJSON, writeJSON, login
};