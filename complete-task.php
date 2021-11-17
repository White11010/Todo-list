<?php 
	
include 'db.php';

$id = $_POST['id'];

$getTaskQuery = "SELECT * FROM tasks WHERE id = $id";
$getResult =  mysqli_query($conn, $getTaskQuery);

while($row = mysqli_fetch_assoc($getResult)) {
	$row['is_completed'] == 0 ? $newStatus = 1 : $newStatus = 0;
}

$query = "UPDATE tasks SET is_completed = $newStatus WHERE id = $id";
$result = mysqli_query($conn, $query);

if ($result) {
	echo 1;
} else {
    echo 0;
}

?>