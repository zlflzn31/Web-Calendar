<?php
ini_set("session.cookie_httponly", 1);  
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
session_start();
require 'database.php';
error_reporting(0);

if (!isset($_SESSION['token'])) {
    echo json_encode(array(
        "success" => false,
        "error_control" => "You are not logged in"
    ));
    exit;
}

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);
$username = htmlentities($_SESSION['username']);
$event_content = htmlentities($json_obj['event_title']);
$shared_username = htmlentities($json_obj['shared_username']);
$event_owner = $username;
$event_year = htmlentities($json_obj['event_year']);
$event_month = htmlentities($json_obj['event_month']);
$event_day = htmlentities($json_obj['event_day']);
if($event_month < 10){
    $event_month = $event_month % 10;
    $event_month = "0".$event_month;
}
if($event_day < 10){
    $event_day = $event_month % 10;
    $event_day = "0". $event_day;
}
$event_date =  "$event_year" . "-" . "$event_month" . "-" . "$event_day";
$event_hour = htmlentities($json_obj['event_hour']);
$event_minute = htmlentities($json_obj['event_minute']);
$event_category = htmlentities($json_obj['event_category']);

//before inserting an event, check if the shared username is not you and also exists in our database
if($shared_username != ""){
	if(mysqli_num_rows(mysqli_query($mysqli, "SELECT username FROM users where username = '$shared_username'")) == 0){
        echo json_encode(array(
	    "success" => false,
        "error_control" => "Shared username does not exist! Event creation failed!" 
	));
       exit;
    }}
	if($shared_username ===$username){
		echo json_encode(array(
	    "success" => false,
        "error_control" => "You added your username in the shared username! Event creation failed!"
	));
       exit;
}

// insert the event
$stmt = $mysqli->prepare("INSERT INTO events (event_id, username, event_date,event_content, event_tag, event_hour, event_minute, shared_username)
                                              VALUES (?,?,?,?,?,?,?,?)");
if(!$stmt){
    echo json_encode(array(
    "success" => false,
    "error_control" => "your event is NOT added to the database!"
));
}else{
    echo json_encode(array(
    "success" => true,
    "username" => $_SESSION['username'],
    "error_control"=>"Your event is successfully added to the database!"
));
}
$stmt->bind_param('issssiis', $event_id, $event_owner, $event_date, $event_content, $event_category,$event_hour,$event_minute,$shared_username);
$stmt->execute();
$stmt->close();

exit();

?>