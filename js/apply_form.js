let currentStep = 0; // Track the current step in the form
let captcha; // Variable to store the CAPTCHA code

// Initialize CAPTCHA and form steps on page load
document.addEventListener('DOMContentLoaded', () => {
    generate(); // Generate CAPTCHA on page load
    navigateForm(0); // Ensure the form starts at the first step
});

function navigateForm(step) {
    const steps = document.querySelectorAll(".form-step");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // Hide the current step
    steps[currentStep].classList.add("d-none");

    // Move to the next step
    currentStep += step;

    // Ensure we stay within bounds
    if (currentStep < 0) currentStep = 0;
    if (currentStep >= steps.length) currentStep = steps.length - 1;

    // Show the next step
    steps[currentStep].classList.remove("d-none");

    // Handle button visibility
    if (currentStep === 0) {
        prevBtn.style.display = "none";
    } else {
        prevBtn.style.display = "inline-block";
    }

    if (currentStep === steps.length - 1) {
        nextBtn.textContent = "Submit Application";
        nextBtn.onclick = confirmSubmission;
    } else {
        nextBtn.textContent = "Next";
        nextBtn.onclick = () => {
            if (validateStep()) {
                navigateForm(1);
            }
        };
    }
}

function validateStep() {
    const currentFormStep = document.querySelectorAll(".form-step")[currentStep];
    const inputs = currentFormStep.querySelectorAll("input, textarea, select");
    let valid = true;

    // Reset previous error messages
    document.querySelectorAll(".is-invalid").forEach(input => input.classList.remove("is-invalid"));

    // Check each input in the current step
    inputs.forEach(input => {
        if (input.required && !input.value) {
            valid = false;
            input.classList.add("is-invalid");
        }
    });

    // Special validation for the final step
    if (currentStep === document.querySelectorAll(".form-step").length - 1) {
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();
        const username = document.getElementById("username").value.trim();

        // Validate password and confirm password match
        if (password !== confirmPassword) {
            valid = false;
            document.getElementById("key").innerHTML = "Passwords did not match. Please try again.";
        }

        // Validate username is not empty
        if (!username) {
            valid = false;
            document.getElementById("key").innerHTML += "<br>Username cannot be empty.";
        }

        // Return false if validation fails
        if (!valid) {
            return false;
        }
    }

    return valid;
}

function confirmSubmission() {
    const usr_input = document.getElementById("submit").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const username = document.getElementById("username").value.trim();
    const termsAccepted = document.getElementById("terms").checked;

    // Validate CAPTCHA
    if (usr_input !== captcha.innerHTML) {
        document.getElementById("key").innerHTML = "CAPTCHA Not Matched";
        return;
    }

    // Validate Password
    if (password !== confirmPassword) {
        alert("Passwords did not match. Please try again.");
        return;
    }

    // Validate Username
    if (!username) {
        alert("Enter Username Correctly");
        return;
    }

    if (!password) {
        alert("Enter Password Correctly");
        return;
    }

    // Check if Terms & Conditions are accepted
    if (!termsAccepted) {
        alert("Please accept the Terms & Conditions before submitting.");
        return;
    }

    // Show confirmation dialog
    const confirmation = confirm("Are you sure you want to apply for the Ration Card?");
    if (confirmation) {
        // Show success message
        alert("Registration Successful!");

        // Redirect to index.html after showing success message
        window.location.href = "index.html";
    }
}

function generate() {
    document.getElementById("submit").value = ""; // Clear old input
    captcha = document.getElementById("image"); // Get CAPTCHA element
    let uniquechar = "";
    const randomchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    // Generate CAPTCHA code of length 5
    for (let i = 0; i < 5; i++) {
        uniquechar += randomchar.charAt(Math.random() * randomchar.length);
    }

    captcha.innerHTML = uniquechar; // Set CAPTCHA code
}

function printmsg() {
    const usr_input = document.getElementById("submit").value.trim();

    if (usr_input === captcha.innerHTML) {
        document.getElementById("key").innerHTML = "Matched";
    } else {
        document.getElementById("key").innerHTML = "Not Matched";
    }
}
