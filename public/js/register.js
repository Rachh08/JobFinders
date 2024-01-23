document.addEventListener("DOMContentLoaded", function () {
    var registerForm = document.getElementById("registerForm");

    if (registerForm) {
        document.getElementById("registerButton").addEventListener("click", register);
    } else {
        var errorMessageElement = document.getElementById("error");
        if (errorMessageElement) {
            errorMessageElement.innerHTML = 'Form not available. Please try again later.';
        }
    }
});

function register(event) {
    event.preventDefault();

    var emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    var jsonData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        mobile: document.getElementById("mobile").value,
    };

    var confirmPassword = document.getElementById("confirmPassword").value;

    var errorElement = document.getElementById("error");

    // Clear previous errors
    errorElement.innerHTML = '';

    // Name validation
    if (!jsonData.name.trim() || !/^[a-zA-Z]+$/.test(jsonData.name)) {
        errorElement.innerHTML = 'Invalid name format!';
        return;
    }

    // Email validation
    if (!emailRegex.test(jsonData.email)) {
        errorElement.innerHTML = 'Invalid email format!';
        return;
    }

    // Password validation
    if (!passwordRegex.test(jsonData.password)) {
        errorElement.innerHTML = 'Password must include at least one uppercase letter, one lowercase letter, one numeral, one special character, and be at least 8 characters long!';
        return;
    }

    // Confirm password validation
    if (!confirmPassword.trim() || jsonData.password !== confirmPassword) {
        errorElement.innerHTML = 'Password and Confirm Password do not match!';
        return;
    }

    // Mobile validation
    if (!jsonData.mobile.trim() || !/^\d{8,}$/.test(jsonData.mobile)) {
        errorElement.innerHTML = 'Invalid Mobile Number!';
        return;
    }

    fetch("/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.message === undefined) {
                window.location.href = 'index.html';
            } else {
                errorElement.innerHTML = `Authentication failed: ${data.message}`;
            }
        })
        .catch(error => {
            console.error('Network error occurred', error);
            errorElement.innerHTML = 'Network error. Please check your connection.';
        });
}
