<?php
    // Check if a redirect URL is provided
    if (isset($_GET['redirect'])) {
        $redirectUrl = $_GET['redirect'];
        header("Location: $redirectUrl");
        exit(); // Make sure to exit after redirection
    } 
    
    // Check if the form is submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Retrieve form data
        $username = $_POST["username"];
        $email = $_POST["email"];
        $password = $_POST["password"]; // Note: Password should be hashed before storing in the database for security

        // Check if form fields are not empty
        if(empty($username) OR empty($email) OR empty($password)){
            echo '<font color="red">Attention, il faut renseigner tous les champs !</font>' ; 
        }
        else {
            // Database insertion logic
            require('Connection.php'); 
            // Hash the password for security
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            // Prepare and bind the SQL statement
            $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
            $stmt->execute(array($username, $email, $hashed_password));

            echo '<font color="green">User has been added successfully !</font>' ; 
        }
    }
    else {
        // If no form submission, redirect to a default page
        header("Location: Games.html");
        exit();
    }
?>
