function viewUsers() {
    var request = new XMLHttpRequest();
    request.open('GET', '/view-user', true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
      if (request.status === 200) {
        var response = JSON.parse(request.responseText);
        var tableContent = document.getElementById('tableContent');
        var html = '';

        for (var i = 0; i < response.users.length; i++) {
          html += '<tr>' +
            '<td>' + response.users[i].id + '</td>' +
            '<td>' + response.users[i].name + '</td>' +
            '<td>' + response.users[i].email + '</td>' +
            '<td>' + response.users[i].password + '</td>' +
            '<td>' + response.users[i].mobile + '</td>' +
            '<td>' +
            '<button type="button" class="btn btn-warning" onclick="updateUser(\'' +
            JSON.stringify(response.users[i]).replaceAll('\"', '&quot;') + '\')">Update </button> ' +
            '<button type="button" class="btn btn-danger" onclick="deleteUser(\'' +
            response.users[i].name +'\')"> Delete</button>' +
            '</td>' +
            '</tr>';
        }

        tableContent.innerHTML = html;
      } else {
        console.error('Error fetching user data:', request.statusText);
      }
    };

    request.send();
  }

  // Call the function when the page is loaded
  window.onload = function () {
    viewUsers();
  };

function updateUser(data) {    
    var selectedUser = JSON.parse(data);        
    document.getElementById("updatePassword").value = selectedUser.password;     
    document.getElementById("updateMobile").value = selectedUser.mobile;     
    document.getElementById("updateButton").setAttribute("onclick", 'editUser("' + selectedUser.id + '")'); // changed from updateUser to editUser    
    $('#updateUserModal').modal('show'); 
}

function editUser(id) {
    console.log(id);
    var response = "";
    var jsonData = new Object();
    jsonData.password = document.getElementById("updatePassword").value; // corrected property name from name to password
    jsonData.mobile = document.getElementById("updateMobile").value; // corrected property name from location to mobile
    if (jsonData.password == "" || jsonData.mobile == "") {
        document.getElementById("editMessage").innerHTML = 'All fields are required!';
        document.getElementById("editMessage").setAttribute("class", "text-danger");
        return;
    }

    var request = new XMLHttpRequest();
    request.open("PUT", "/updateuser/" + id, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "User details has been successfully updated!") {
            document.getElementById("editMessage").innerHTML = 'Update User Details: ' + jsonData.name + '!';
            document.getElementById("editMessage").setAttribute("class", "text-success");
            window.location.href = 'user.html';
        } else {
            document.getElementById("editMessage").innerHTML = 'User details has not been updated successfully!';
            document.getElementById("editMessage").setAttribute("class", "text-danger");
        }
    };
    request.send(JSON.stringify(jsonData));
}

function deleteUser(name){

    var password = prompt("To delete the user, please enter your password: ");

    if(password === null){
        return;
    }

    var request = new XMLHttpRequest();

    request.open("DELETE", "/delete-user/" + name, true);
    request.setRequestHeader('Content-Type','application/json');

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            var response = JSON.parse(request.responseText);
            if (response.message === `User '${name}' deleted successfully.`) {
                alert("User deleted successfully");
                window.location.reload();
            } else {
                alert("Unable to delete user. Please check password and try again.")
            }
        }
    };
    
    request.send(JSON.stringify({password: password}));

}