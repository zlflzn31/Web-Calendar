<?php

// Content of database.php
$mysqli = new mysqli('localhost', 'MO3_Admin', '1234', 'MO5');
if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
}
?>