document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".login-button").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default form submission
        console.log("Login button clicked"); // Debugging statement

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        console.log(`Username: ${username}, Password: ${password}`); // Debugging statement

        let errors = false;

        // Clear previous error messages
        clearErrors();

        // Username validation (not empty)
        if (username === "") {
            displayError("username", "Please enter your username.");
            errors = true;
        }

        // Password validation (not empty)
        if (password === "") {
            displayError("password", "Please enter your password.");
            errors = true;
        }

        // If there are validation errors, stop further processing
        if (errors) {
            console.log("Validation errors found"); // Debugging statement
            return;
        }

        // Send login data to the backend
        fetch('http://localhost:5501/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            console.log("Response received from server"); // Debugging statement
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            console.log("Data received from server:", data); // Debugging statement
            if (data.message) {
                alert(data.message); // Login successful
                window.location.href = 'index.html'; // Redirect to the dashboard
            } else if (data.error) {
                alert(data.error); // Display login error
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during login: ' + error.message);
        });
    });
});

// Function to display error messages below the input fields
function displayError(inputId, message) {
    const inputField = document.getElementById(inputId);
    const errorMessage = document.createElement("div");
    errorMessage.className = "error";
    errorMessage.style.color = "red";
    errorMessage.innerText = message;
    inputField.parentElement.appendChild(errorMessage);
}

// Function to clear previous error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error');
    errorMessages.forEach(error => error.remove());
}
