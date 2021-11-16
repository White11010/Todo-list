<?php 
	
$server = "localhost";
$username = "root";
$password = "";
$database = "to_do_list";

$conn = mysqli_connect($server, $username, $password, $database);

if (!$conn) {
	die("<script>alert('Connection to db failed!</script>')");
}

?>