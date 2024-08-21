//fade in effect
document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the item is visible
    });

    items.forEach(item => {
        observer.observe(item);
    });
});
//fade-in

 // Customizing carousel controls for sliding one item at a time
 document.querySelectorAll('.carousel-control-prev, .carousel-control-next').forEach(button => {
        button.addEventListener('click', function() {
            const carousel = document.querySelector('#gridCarousel');
            const items = carousel.querySelectorAll('.carousel-item');
            const activeItem = carousel.querySelector('.carousel-item.active');

            let newIndex = Array.from(items).indexOf(activeItem);

            if (button.classList.contains('carousel-control-prev')) {
                newIndex = newIndex - 1 >= 0 ? newIndex - 1 : items.length - 1;
            } else {
                newIndex = newIndex + 1 < items.length ? newIndex + 1 : 0;
            }

            activeItem.classList.remove('active');
            items[newIndex].classList.add('active');
        });
    });




    //typewriter re work 


    //dark mode
    $(document).ready(function(){
        // Check if dark mode is enabled
        if(localStorage.getItem('dark-mode') === 'enabled') {
            enableDarkMode();
        }

        // Toggle dark mode on button click
        $('#darkModeToggle').click(function() {
            if(localStorage.getItem('dark-mode') !== 'enabled') {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        });

        function enableDarkMode() {
            $('body').addClass('dark-mode');
            $('.navbar').addClass('dark-mode');
            $('.bg-light').addClass('dark-mode');
            $('.text-primary').addClass('dark-mode');
            $('.btn-outline-secondary').addClass('dark-mode');
            localStorage.setItem('dark-mode', 'enabled');
            $('#darkModeToggle').html('<i class="bi bi-sun"></i> Light Mode');
        }

        function disableDarkMode() {
            $('body').removeClass('dark-mode');
            $('.navbar').removeClass('dark-mode');
            $('.bg-light').removeClass('dark-mode');
            $('.text-primary').removeClass('dark-mode');
            $('.btn-outline-secondary').removeClass('dark-mode');
            localStorage.setItem('dark-mode', 'disabled');
            $('#darkModeToggle').html('<i class="bi bi-moon"></i> Dark Mode');
        }
    });

    // Add this to your existing script.js

document.getElementById('darkModeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    
    // Toggle dark mode for the navbar
    document.querySelector('.navbar').classList.toggle('navbar-dark-mode');
    
    // Optionally change the icon in the dark mode toggle button
    if (document.body.classList.contains('dark-mode')) {
        this.innerHTML = '<i class="bi bi-sun"></i> Light Mode';
    } else {
        this.innerHTML = '<i class="bi bi-moon"></i> Dark Mode';
    }
});
// Retrieve dark mode state from local storage
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Function to apply dark mode
function applyDarkMode(darkMode) {
    if (darkMode) {
        document.body.classList.add('dark-mode');
        document.querySelector('nav').classList.add('navbar-dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        document.querySelector('nav').classList.remove('navbar-dark-mode');
    }
}

// Apply the saved dark mode state on page load
applyDarkMode(isDarkMode);

// Toggle dark mode when the button is clicked
document.getElementById('darkModeToggle').addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    applyDarkMode(isDarkMode);
    // Save the current state in local storage
    localStorage.setItem('darkMode', isDarkMode);
});

    // JavaScript for dark mode toggle


//apply rc section
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



