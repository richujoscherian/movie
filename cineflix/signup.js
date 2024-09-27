document.addEventListener("DOMContentLoaded", function () {
    const signupButton = document.querySelector('.signup-button');

    // Check if the button exists
    if (signupButton) {
        signupButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent form submission

            // Declare the errors variable here
            let errors = false;

            // Get form input values
            const username = document.getElementById('signup-username')?.value.trim();
            const email = document.getElementById('signup-email')?.value.trim();
            const password = document.getElementById('signup-password')?.value.trim();

            clearErrors(); // Clear previous error messages

            // Validate fields
            if (!username) {
                displayError("signup-username", "Please enter a username.");
                errors = true;
            }
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (!emailPattern.test(email)) {
                displayError("signup-email", "Please enter a valid email address.");
                errors = true;
            }
            if (password.length < 6) {
                displayError("signup-password", "Password must be at least 6 characters long.");
                errors = true;
            }

            // If no errors, submit the data
            if (!errors) {
                fetch('http://localhost:5501/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, email, password })
                })                
                .then(response => {
                    // Check if the response is okay (status in the range 200-299)
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.statusText);
                    }
                    return response.json(); // Parse the JSON response
                })
                .then(data => {
                    alert(data.message || data.error);
                    if (data.message) {
                        // Optionally redirect after successful signup
                        window.location.href = 'login.html'; 
                    }
                })
                .catch(err => {
                    console.error('Error:', err);
                    alert('An error occurred: ' + err.message);
                });
            }
        });
    }

    function displayError(inputId, message) {
        const inputField = document.getElementById(inputId);
        
        // Check if the input field exists
        if (inputField) {
            const errorMessage = document.createElement("div");
            errorMessage.className = "error";
            errorMessage.innerText = message;
            inputField.parentElement.appendChild(errorMessage);
        } else {
            console.error(`Input field with ID ${inputId} not found.`);
        }
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error');
        errorMessages.forEach(error => error.remove());
    }
});
