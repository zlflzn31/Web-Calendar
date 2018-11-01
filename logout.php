<?php
    
    session_start();
    if (isset($_SESSION['token'])) {
        header("Content-Type: application/json");
        session_destroy();
        echo json_encode(array("status"=>"success",
                               "username"=>"null"
                               ));        
    }

?>