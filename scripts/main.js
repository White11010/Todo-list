//Get current date
function getDate() {
	let day = new Date().getDate();
	let month = new Date().toLocaleString('en-US', {month: "long"});
	let year = new Date().getFullYear();
	$("#date").html(day + ' ' + month + ' ,' + year);
}


//Get tasks from server
function loadTasks(url, listId) {
	$.ajax({
		url: url,
		type: 'post',
		success: function (data) {
			$(listId).html(data);
			//Get and fill total number of completed and incompleted tasks
			$("#totalIncompleted").html($("#incompletedList .list__item").length + ' incomplete, ');
			$("#totalCompleted").html($("#completedList .list__item").length + ' completed.');
		}
	});
}

$(document).ready(() => {
	getDate();
	loadTasks("get-complete-tasks.php", "#completedList");
	loadTasks("get-incomplete-tasks.php", "#incompletedList");
});


//Add new task (send to server)
$("#addBtn").on("click", function (e) {
	e.preventDefault();

	let task = $("#taskText").val();

	if (task != "" && $(this).text() == "Add") {
		console.log("add");
		$.ajax({
			url: 'add-task.php',
			type: 'post',
			data: {task: task},
			success: function (data) {
				loadTasks("get-incomplete-tasks.php", "#incompletedList");
				$("#taskText").val('');
				if (data == 0) {
					alert("Error...");
				}
			}
		});
	} else if (task != "" && $(this).text() == "Edit") {
		$.ajax({
			url: 'edit-task.php',
			type: 'post',
			data: {task: task, id: $("#addBtn").data('id')},
			success: function (data) {
				$("#addBtn").text("Add");
				loadTasks("get-incomplete-tasks.php", "#incompletedList");
				loadTasks("get-complete-tasks.php", "#completedList");
				$("#taskText").val('');
				if (data == 0) {
					alert("Error...");
				}
			}
		});
	}
});


//Remove task
$(document).on("click", "#removeBtn", function(e) {
	e.preventDefault();
	let id = $(this).data('id');
	$.ajax({
		url: 'delete-task.php',
		type: 'post',
		data: {id: id},
		success: function (data) {
			loadTasks("get-complete-tasks.php", "#completedList");
			loadTasks("get-incomplete-tasks.php", "#incompletedList");
			if (data == 0) {
				alert("Error...");
			}
		}
	});
});

//Edit task
$(document).on("click", "#editBtn", function(e) {
	e.preventDefault();

	//Find task text element in this task item
	let button = $("#addBtn");
	let id = $(this).data('id');
	let taskTitle = $(this).closest(' .list__item').find(' .item__title');
	//Set its text value to input field
	$("#taskText").val(taskTitle.text());
	button.text("Edit");
	button.data("id", id);

});

//Complete task
$(document).on("change", "#checkTask", function(e) {
	e.preventDefault();

	let id = $(this).data('id');
	
	$.ajax({
		url: 'complete-task.php',
		type: 'post',
		data: {id: id},
		success: function (data) {
			loadTasks("get-complete-tasks.php", "#completedList");
			loadTasks("get-incomplete-tasks.php", "#incompletedList");
			if (data == 0) {
				alert("Error...");
			}
		}
	});

});