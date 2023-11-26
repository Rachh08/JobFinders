class User {
    constructor(name, email, password, mobile) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.mobile = mobile;

    //Creating Unique Id for each user
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    this.id = timestamp + "" + random.toString().padStart(3, '0');
    
    }
    }

    module.exports = { User };