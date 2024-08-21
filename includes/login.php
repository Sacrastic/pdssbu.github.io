<?php
// Include the configuration file
include 'config.php';

$error = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if username and password are set
    if (isset($_POST['username']) && isset($_POST['password'])) {
        // Get the form data
        $username = $conn->real_escape_string($_POST['username']);
        $password = md5($conn->real_escape_string($_POST['password'])); // Hash the password

        // Query the database
        $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
        $result = $conn->query($sql);

        if ($result->num_rows == 1) {
            // User found, start a session and redirect
            $_SESSION['username'] = $username;
            header("Location: ../benificiary_dashboard.php");
            exit();
        } else {
            // Invalid login
            $error = "Invalid username or password!";
        }
    } else {
        $error = "Please enter both username and password.";
    }
}

// If there is an error, display it
if (!empty($error)) {
    echo "<div style='color: red; text-align: center;'>$error</div>";
}

// Close the connection
$conn->close();
?>
