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


async function login(req, res) {
   try {
        const email = req.body.email;
        const password = req.body.password;

        const allUsers = await readJSON('utils/users.json');

        var validCredentials = false;

        for (var i = 0; i < allUsers.length; i++) {
            var currUser = allUsers[i];
            if (currUser.email == email && currUser.password == password)
            validCredentials = true;
        } // if user type in correct email and password
        if (validCredentials) {
            return res.status(201).json({ message: 'Login successful!' });
        } 
        // if user only type in correct email 
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

async function register(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const mobile = req.body.mobile;

        // Check if all required fields are filled in
        if (!email || !password || !name || !mobile) {
            return res.status(400).json({ message: 'All fields are required for registration.' });
        }

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
        const usernameToDelete = req.params.name;
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
    readJSON, writeJSON, login, register, updateUserdetails, deleteUser
};
    


