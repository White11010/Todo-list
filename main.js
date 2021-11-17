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
$("#addBtn").on("click", (e) => {
	e.preventDefault();

	let task = $("#taskText").val();
	if (task != "") {
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