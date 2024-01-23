function login() {
    var response = "";
    var jsonData = new Object();
    jsonData.email = document.getElementById("email").value;
    jsonData.password = document.getElementById("password").value;
    // if user did not fill in inputs
    if (jsonData.email == "" || jsonData.password == "") {
    document.getElementById("error").innerHTML = 'All input fields must be filled!';
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
    document.getElementById("error").innerHTML = 'Wrong Email and Password!';
    }
    };
    request.send(JSON.stringify(jsonData));
}