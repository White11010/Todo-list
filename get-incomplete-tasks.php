<?php 
	
include 'db.php';

$query = "SELECT * FROM tasks WHERE is_completed = 0";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
	while ($row = mysqli_fetch_assoc($result)) {


?>		

	<li class="list__item item">
		<div class="item__body">
			<input class="item__check" type="checkbox" id="checkTask" data-id="<?php echo $row['id']; ?>">
			<p class="item__title"><?php echo $row['title']?></p>
		</div>
		<div class="item__buttons">
			<img src="./images/edit-icon.svg" alt="edit" class="item__button" id="editBtn" data-id="<?php echo $row['id']; ?>">
			<img src="./images/delete-icon.svg" alt="delete" class="item__button" id="removeBtn" data-id="<?php echo $row['id']; ?>">
		</div>
	</li>

<?php
	}
} else {
	echo '<li class="list__item empty"><p class="item__title">No tasks...</p></li>';
}

?>