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
        //to update the password and mobile 
       if (edit) {
            await fs.writeFile('utils/users.json', JSON.stringify(allUsers), 'utf8');
           return res.status(201).json({ message: 'User details has been successfully updated!' });
      }  //if password exceeds 8 digits
        if ( password.length > 8){
            await fs.writeFile('utils/users.json', JSON.stringify(allUsers), 'utf8');
            return res.status(500).json({message: "Password should not have more than 8 digits!"});
        }  //if password does not consist of uppercase  
        if ( !/(?=.*[A-Za-z])(?=.*[!@#$%^&*])/.test(password)) {
            await fs.writeFile('utils/users.json', JSON.stringify(allUsers), 'utf8');
            return res.status(500).json({message: "Password should contain one upper case letter and special character and must not have numbers!"})
        }   
        
        // if mobile number consist of letter 
        if ( !/^[0-9]/.test(mobile)) {
           await fs.writeFile('utils/users.json', JSON.stringify(allUsers), 'utf8');
           return res.status(500).json({message: "Mobile number should contain only numbers!"});
        }
        //if  mobile number exceeds 8 digits
        if ( mobile.length > 8){
            await fs.writeFile('utils/users.json', JSON.stringify(allUsers), 'utf8');
            return res.status(500).json({message: "Mobile Number should not have more than 8 digits "});
        }  
         //if user does not fill all input 
        if (!mobile || !password) {
            await fs.writeFile('utils/users.json', JSON.stringify(allUsers), 'utf8');
            return res.status(400).json({ message: 'All input fields must be filled!' });
        } 
        else {
            return res.status(201).json({ message: 'User details is unsuccessful!' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
readJSON, writeJSON, updateUserdetails
};