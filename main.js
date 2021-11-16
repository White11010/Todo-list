//Get tasks from server
function loadTasks() {
	$.ajax({
		url: 'get-tasks.php',
		type: 'post',
		success: function (data) {
			$("#taskList").html(data);
		}
	});
}

$(document).ready(() => {
	loadTasks();
});


//Add new task (send to server)
$("#addBtn").on("click", (e) => {
	e.preventDefault();

	let task = $("#taskText").val();

	$.ajax({
		url: 'add-task.php',
		type: 'post',
		data: {task: task},
		success: function (data) {
			loadTasks();
			$("#taskText").val('');
			if (data == 0) {
				alert("Error...");
			}
		}
	});
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
			loadTasks();
			if (data == 0) {
				alert("Error...");
			}
		}
	});
});