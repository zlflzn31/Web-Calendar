<?php
// login_ajax.php
require 'database.php';
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json


//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

//Variables can be accessed as such:
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']
$username = $json_obj['username'];
$password = $json_obj['password'];

// Check to see if the username and password are valid.  (You learned how to do this in Module 3.)
if(mysqli_num_rows(mysqli_query($mysqli, "select username from users where username = '$username'" )) ==0){
    echo json_encode(array("success"=>false
                           ));
    //add some comments about why false) this is because username does not match 
    exit();
}
// get the password
$stmt = $mysqli->prepare("select password from users where username = '$username'");
if(!$stmt){
   printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}
$stmt->execute();
$stmt->bind_result($password_hashed);
$stmt->fetch();

if(password_verify($password, $password_hashed)){
   session_start();
   $_SESSION['username'] = $username;
   $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));
	echo json_encode(array(
		"success" => true,
      "username" => $_SESSION['username'],
      "token" => $_SESSION['token']
	));
	exit;
}else{
	echo json_encode(array(
		"success" => false
	));
	exit;
}
?>