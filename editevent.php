
<?php
    session_start();
	ini_set("session.cookie_httponly", 1);
    header("Content-Type: application/json");
    require 'database.php';

    if (!isset($_SESSION['token'])) {
        exit;
    }
    else {

        $username = htmlentities($_SESSION['username']);
        $original_event_name = htmlentities($_POST["original_event_name"]);
        $edit_event_name = htmlentities($_POST["edit_event_name"]);

        $stmt = $mysqli->prepare("SELECT username from events WHERE event_content = ?");
        if (!$stmt) {
                echo json_encode(array(
                    "success" => false,
                ));
                exit;
        }
        $stmt->bind_param('s',$original_event_name);
        $stmt->execute();
        $stmt->bind_result($original_owner);
        $stmt->close();
 
	
    if($original_owner == $username){

        // check the event exists
        $stmt = $mysqli->prepare("UPDATE events SET event_content = ? WHERE event_content = ?");
        if (!$stmt) {
                echo json_encode(array(
                    "success" => false,
                ));
                exit;
        }      
        $stmt->bind_param('ss',$edit_event_name, $original_event_name);
        $stmt->execute();
        $stmt->close();
  
        }else{
            exit;
        }
        
    }
        
?>