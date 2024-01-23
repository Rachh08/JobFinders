function updateUser(data) {
    var selectedUser = JSON.parse(data);
    document.getElementById("updatePassword").value = selectedUser.password;
    document.getElementById("updateMobile").value = selectedMobile.mobile;
    document.getElementById("updateButton").setAttribute("onclick", 'updateUser("' +
    selectedUser.id + '")');
    $('#updateUserModal').modal('show');
}

function editUser(id) {
    console.log(id)
    var response = "";
    var jsonData = new Object();
    jsonData.name = document.getElementById("updatePassword").value;
    jsonData.location = document.getElementById("updateMobile").value;
    if (jsonData.password == "" || jsonData.mobile == "" ) {
    document.getElementById("editMessage").innerHTML = 'All fields are required!';
    document.getElementById("editMessage").setAttribute("class", "text-danger");
    return;
    }
    if ( password.length > 8){
        document.getElementById("editMessage").innerHTML = "Password should not have more than 8 digits!";
        return;
    }  //if password does not consist of uppercase  
    if ( !/(?=.*[A-Za-z])(?=.*[!@#$%^&*])/.test(password)) {
        document.getElementById("editMessage").innerHTML = "Password should contain one upper case letter and special character and must not have numbers!";
        return;
    }   
    // if mobile number consist of letter 
    if ( !/^[0-9]/.test(mobile)) {
        document.getElementById("editMessage").innerHTML = "Mobile number should contain only numbers!";
        return;
    }
    //if  mobile number exceeds 8 digits
    if ( mobile.length > 8){
        document.getElementById("editMessage").innerHTML = "Mobile Number should not have more than 8 digits ";
        return;
    }
    var request = new XMLHttpRequest();
    request.open("PUT", "/updateUser/" + id, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
    response = JSON.parse(request.responseText);
    if (response.message == "User modified successfully!") {
    document.getElementById("editMessage").innerHTML = 'Update User Details: ' +
    jsonData.name + '!';
    document.getElementById("editMessage").setAttribute("class",
    "text-success");
    window.location.href = 'home.html';
    }
    else {
    document.getElementById("editMessage").innerHTML = 'Unable to edit user details!';
    document.getElementById("editMessage").setAttribute("class", "text-danger");
    }
    };
    request.send(JSON.stringify(jsonData));
}