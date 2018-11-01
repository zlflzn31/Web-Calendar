<?php
require 'database.php';
session_start();
header("Content-Type: application/json");

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

//Variables can be accessed as such:
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']
$username = $json_obj['username'];
$password = $json_obj['password'];
$password_hashed = password_hash($password,PASSWORD_DEFAULT);

//LOGIC FOR SAME USERNAME!!!!

$stmt = $mysqli->prepare("insert into users (username, password) values ('$username','$password_hashed')");
if($stmt){
	echo json_encode(array(
		"success" => true
	 ));
}
else{
	 echo json_encode(array(
		 "success" => false
	 ));
}
$stmt->execute();
$stmt->close();
exit;


?>