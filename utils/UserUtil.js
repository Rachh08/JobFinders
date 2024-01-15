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
    console.log("register func")
    
    try {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const mobile = req.body.mobile;

        const allUsers = await readJSON('utils/users.json');

        // Checks if all fields are filled in 
        if (!email || !password || !name || !mobile) {
            return res.status(400).json({ message: 'All fields are required for registration.' });
        }
        // Checks if the email string does not include the '@'and '.com' substring
        if (!email.includes('@') || !email.includes('.com')) {
            return res.status(500).json({ message: 'Invalid email format.' });
        }

        // Checks if the length of the password string is less than 8 characters
        if (password.length < 8) {
            return res.status(500).json({ message: 'Password must be at least 8 characters long.' });
        }

        // Checks if the password string contains at least one uppercase letter 
        if (!/(?=.*[A-Z])/.test(password)) {
            return res.status(500).json({ message: 'Password must contain at least one uppercase letter.' });
        }
        // Checks if the password string contains one special character
        if (!/(?=.*[!@#$%^&*])/.test(password)) {
            return res.status(500).json({ message: 'Password must contain at least one special character.' });
        }
        // Checks if the name string contains only letters and is filled in
        if (!/^[a-zA-Z]+$/.test(name) || name.length === 0) {
            return res.status(500).json({ message: 'Invalid name format.' });
        }        
        // Checks if the mobile string contains exactly 8 digits
        if (!mobile.trim() || !/^\d{8}$/.test(mobile)) {
            return res.status(500).json({ message: 'Invalid mobile format.' });
        }

        const newUser = new User(email, password, name, mobile);
        console.log("here")
        const updatedUsers = await writeJSON(newUser, 'utils/users.json');
        return res.status(201).json(updatedUsers);
    } catch (error) {
      
    //     // Check if all required fields are filled in
    //     if (!email || !password || !name || !mobile) {
    //         return res.status(400).json({ message: 'All fields are required for registration.' });
    //     }

    //     if (!email.includes('@') || !email.includes('.com') || password.length < 8 ||!/(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(password)
    //     ||!/^[a-zA-Z]+$/.test(name) ||!mobile.trim()|| !/^\d{8}$/.test(mobile)) {
    //         return res.status(500).json({ message: 'Validation error' });
    //     } else {
    //         const newUser = new User(email, password, name, mobile);
    //         const updatedUsers = await writeJSON(newUser, 'utils/users.json');
    //         return res.status(201).json(updatedUsers);
    //     }
    // } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

async function updateUser(req, res) {
    try {
    const id = req.params.id;
    const password = req.body.password;
    const mobile = req.body.mobile;
    

    const allUsers = await readJSON('utils/users.json');

        var edit = false;

        for (var i = 0; i < allUsers.length; i++) {
            var currUser = allUsers[i];
            if (currUser.id == id){
                allUsers[i].password = password;
                allUsers[i].mobile = mobile;

                edit = true;
            }   
        }
        //if password exceeds 8 digits
        if ( password.length > 8){
            return res.status(500).json({message: "Password should not have more than 8 digits!"});
        }  //if password does not consist of uppercase  
        if ( !/(?=.*[A-Za-z])(?=.*[!@#$%^&*])/.test(password)) {
            return res.status(500).json({message: "Password should contain one upper case letter and special character and must not have numbers!"})
        }   
        // if mobile number consist of letter 
        if ( !/^[0-9]/.test(mobile)) {
           return res.status(500).json({message: "Mobile number should contain only numbers!"});
        }
        //if  mobile number exceeds 8 digits
        if ( mobile.length > 8){
            return res.status(500).json({message: "Mobile Number should not have more than 8 digits "});
        }  
         //if user does not fill all input 
        if (!mobile || !password) {
            return res.status(400).json({ message: 'All input fields must be filled!' });
        }  //to update the password and mobile  
        if (edit) {
            await fs.writeFile('utils/users.json', JSON.stringify(allUsers), 'utf8');
            return res.status(201).json({ message: 'User details has been successfully updated!' });
       }
        else {
            return res.status(500).json({ message: 'User details is unsuccessful!' });
        }
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
    readJSON, writeJSON, login, register, updateUser, deleteUser
};
    
