<?php
session_start(); // Start the session

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Validate credentials (You need to query the database to check if the credentials are correct)
    // Assuming you have a users table with columns username and password
    require('Connection.php'); // Include the database connection script

    // Prepare and execute the SQL statement to retrieve the user with the provided username
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);

    // Fetch the user record from the result set
    $user = $stmt->fetch();

    // Verify if the user exists and the password is correct
    if ($user && password_verify($password, $user['password'])) {
        // Authentication successful
        $_SESSION['user_id'] = $user['id']; // Store the user ID in the session
        $_SESSION['username'] = $user['username']; // Store the username in the session

        // Redirect the user to the selected game page (or a default page)
        if (isset($_SESSION['redirect_url'])) {
            $redirectUrl = $_SESSION['redirect_url'];
            unset($_SESSION['redirect_url']); // Remove the redirect URL from session
            header("Location: $redirectUrl");
            exit();
        } else {
            // Redirect to a default page (e.g., games page)
            header("Location: Games.html");
            exit();
        }
    } else {
        // Authentication failed
        $error_message = "Invalid username or password. Please try again.";
    }
}
?>
