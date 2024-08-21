<?php
// Start session
session_start();

// Connect to the database
$conn = new mysqli('localhost', 'root', '', 'login_db');

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
