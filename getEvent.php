<?php
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

ini_set("session.cookie_httponly", 1);
session_start();

if (!isset($_SESSION['token'])) {
  exit;
}
else {
//make sure that there is a click_date POSTED from the firstPage

$username = $_SESSION['username'];
require 'database.php';

//OCT 20 DK : This function, when a user calls events by clicking on a date, it retrieves data from sql that matches the date and the username
$stmt = $mysqli->prepare("SELECT * FROM events WHERE username = ?");
if (!$stmt) {
        echo json_encode(array(
            "success" => false,
        ));
        exit;
    }
$stmt->bind_param('s',$username);
$stmt->execute();
$stmt->bind_result($event_id,$username, $event_date, $event_content,$event_tag,$event_hour,$event_minute, $shared_username);

 // print out the information
 $event_lists = array();
 $event_dates = array();
 $event_hours = array();
 $event_minutes = array();
 $event_tags = array();
 $shared_usernames = array();
 $index = 0;

 while($stmt->fetch()){
     $event_lists[$index] = $event_content;
     $event_dates[$index] = $event_date;
     $event_hours[$index] = $event_hour;
     $event_minutes[$index] = $event_minute;
     $event_tags[$index] = $event_tag;
     $shared_usernames[$index] = $shared_username;
     $index++;
 }


 $stmt -> close();
 echo json_encode(array(
     "event_lists" => $event_lists,
     "event_dates" => $event_dates,
     "event_hours" => $event_hours,
     "event_minutes" => $event_minutes,
     "event_tags" => $event_tags,
     "shared_usernames" => $shared_usernames));




}
?>


