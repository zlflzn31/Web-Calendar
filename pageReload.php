<?php
    
    session_start();
    require 'database.php';
    header("Content-Type: application/json");
    if(isset($_SESSION['token']) == false){
        echo json_encode(array("success"=>false
                               ));
        exit();
        
    }
    else{
        echo json_encode(array("success"=>true,
                                "username" => $_SESSION['username'],
                                "token"=> $_SESSION['token']
                               ));
        exit();
    }    
?>