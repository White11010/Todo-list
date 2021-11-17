<?php 
	
include 'db.php';

$task = $_POST['task'];
$id = $_POST['id'];

$query = "UPDATE tasks SET title = '$task' WHERE id = '$id'";
$result = mysqli_query($conn, $query);

if ($result) {
	echo $id;
} else {
    echo mysqli_error($conn);
}


?>