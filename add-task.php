<?php 
	
include 'db.php';

$task = $_POST['task'];

$query = "INSERT INTO tasks (title)  VALUES ('$task')";
$result = mysqli_query($conn, $query);

if ($result) {
	echo 1;
} else {
    echo 0;
}


?>