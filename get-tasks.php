<?php 
	
include 'db.php';

$query = "SELECT * FROM tasks";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
	while ($row = mysqli_fetch_assoc($result)) {
?>		

<li>
	<p><?php echo $row['title']; ?></p>
	<button id="removeBtn" data-id="<?php echo $row['id']; ?>">Remove</button>
</li>

<?php
	}
	echo '<div class="list__total"><p>' . mysqli_num_rows($result) . '</p></div>';
} else {
	echo "<li>No records</li>";
}

?>