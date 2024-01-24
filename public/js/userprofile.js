//delete function
// function deleteUser(){
//     var name =""
// }

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
    if (jsonData.password == "" || jsonData.mobile == "") {
        document.getElementById("editMessage").innerHTML = 'All fields are required!';
        document.getElementById("editMessage").setAttribute("class", "text-danger");
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