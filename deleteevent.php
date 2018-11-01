<?php
	ini_set("session.cookie_httponly", 1);
	require 'database.php';
	session_start();
	
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
$delete_event = htmlentities($json_obj['delete_event']);


$stmt = $mysqli->prepare("select username from events where event_content = ?");
if(!$stmt){
		echo json_encode(array("success"=>false,
						"error_control"=> $mysqli->error
						));
		 exit;
	 }
	 $stmt->bind_param('s', $delete_event);
	 $stmt->execute();
	 $stmt->bind_result($username);
	 $stmt->fetch();
	 $stmt->close();

	if($_SESSION['username'] === $username){
		$stmt1 = $mysqli->prepare("delete from events where event_content= ?");
			if(!$stmt1){
				echo json_encode(array("success"=>false,
					"error_control"=> $mysqli->error
					));
				exit();
			}			

		$stmt1->bind_param('s', $delete_event);
		$stmt1->execute();
		$stmt1->close();
		echo json_encode(array("success"=>true,
						   "error_control"=> "Event Deleted!"
						   ));
		exit();
	}
	else{
		echo json_encode(array("success"=>false,
						   "error_control"=> "You cannot delete an event that you do not own"
						   ));
		exit();
	}


?>