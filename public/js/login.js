function login() {
    var response = "";
    var jsonData = new Object();
    jsonData.email = document.getElementById("email").value;
    jsonData.password = document.getElementById("password").value;
    if (jsonData.email == "" || jsonData.password == "") {
    document.getElementById("error").innerHTML = 'All fields are required!';
    return;
    }// if user only type in correct email 
    if (jsonData.email == email) {
    document.getElementById("error").innerHTML = 'Invalid password!';
    return;
    } // if user only type in correct password 
    if (jsonData.password == password) {
    document.getElementById("error").innerHTML = 'Invalid email!';
    return;
    }
    var request = new XMLHttpRequest();
    request.open("POST", "/login", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function() {
    response = JSON.parse(request.responseText);
    console.log(response)
    if (response.message == "Login successful!") {
    sessionStorage.setItem("email", jsonData.email);
    window.location.href = 'home.html';
    } //if user fill all input wrongly
    else {
    document.getElementById("error").innerHTML = 'Invalid credentials!';
    }
    };
    request.send(JSON.stringify(jsonData));
}