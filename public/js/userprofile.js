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
            //'<td>' + response.users[i].id + '</td>' +
            '<td>' + response.users[i].name + '</td>' +
            '<td>' + response.users[i].email + '</td>' +
            '<td>' + response.users[i].mobile + '</td>' +
            '<td>' + response.users[i].password + '</td>' +
            '<td>' +
            '<button type="button" class="btn btn-warning" onclick="editUser(' +
            response.users[i].id + ')">Edit </button> ' +
            '<button type="button" class="btn btn-danger" onclick="deleteUser(' +
            response.users[i].name + ')"> Delete</button>' +
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