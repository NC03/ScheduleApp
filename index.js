var assignments = [
	{ category: "Test", status: "Incomplete", duedate: new Date(2020, 0, 11), title: "Momentum" },
	{ category: "Test", status: "Incomplete", duedate: new Date(2020, 0, 11), title: "Final" },
	{ category: "Test", status: "Incomplete", duedate: new Date(2020, 0, 11), title: "Reading Analysis" },
	{ category: "Test", status: "Incomplete", duedate: new Date(2020, 0, 11), title: "Final" }
];
var courses = [
	{
		period: 1,
		title: "AP Physics",
		times: [{ weekday: 1, startTime: new Date(0, 0, 0, 7, 55, 0, 0), endTime: new Date(0, 0, 0, 8, 45, 0, 0) }]
	},
	{
		period: 2,
		title: "US History",
		times: [{ weekday: 1, startTime: new Date(0, 0, 0, 8, 55, 0, 0), endTime: new Date(0, 0, 0, 9, 45, 0, 0) }]
	},
	{
		period: 3,
		title: "French 3",
		times: [{ weekday: 1, startTime: new Date(0, 0, 0, 10, 30, 0, 0), endTime: new Date(0, 0, 0, 11, 20, 0, 0) }]
	},
	{
		period: 4,
		title: "AP Chemistry",
		times: [{ weekday: 1, startTime: new Date(0, 0, 0, 11, 30, 0, 0), endTime: new Date(0, 0, 0, 12, 20, 0, 0) }]
	},
	{
		period: 5,
		title: "English 11",
		times: [{ weekday: 1, startTime: new Date(0, 0, 0, 13, 05, 0, 0), endTime: new Date(0, 0, 0, 13, 55, 0, 0) }]
	},
	{
		period: 6,
		title: "AP Calculus",
		times: [{ weekday: 1, startTime: new Date(0, 0, 0, 14, 05, 0, 0), endTime: new Date(0, 0, 0, 14, 55, 0, 0) }]
	}
];
var assignmentCategories = ["Test", "Event", "Project"]; //"Assignment"
var assignmentStatuses = ["Incomplete", "InProgress", "Complete", "Submitted"];
var currentWeek;

const fs = require("fs");
const path = require("path");
const { app } = require("electron").remote;

document.addEventListener("DOMContentLoaded", () => {
	console.log("DOMContentLoaded");
	setTimeout(() => {
		console.log("timeout");
		page(1);
		isFirstLoad();
	}, 1500);
	document.getElementById("submit").addEventListener("click", () => {
		var course = document.getElementById("courses").selectedIndex;
		var title = document.getElementById("text").value;
		var category = assignmentCategories[document.getElementById("category").selectedIndex];
		var date = new Date(document.getElementById("date__input").value);
		assignments.push({
			category: category,
			status: assignmentStatuses[0],
			duedate: date,
			title: title,
			courseIndex: course
		});
		save();
	});
});

function promptCourseEntry() {}

function isFirstLoad() {
	fs.readFile(path.join(app.getPath("userData"), "firstload"), "utf-8", (err, data) => {
		if (err) {
			promptCourseEntry();
		} else {
			load();
		}
	});
}

function load() {
	console.log("loading");
	fs.readFile(path.join(app.getPath("userData"), "data.json"), "utf-8", (err, data) => {
		console.log("finished loading");
		if (err) {
			console.log(err);
			save();
		} else {
			document.getElementById("div--splash").style.display = "none";
			if (data == "") {
				save();
			} else {
				data = JSON.parse(data);
				assignments = [];
				if (data.assignments) {
					for (var i = 0; i < data.assignments.length; i++) {
						data.assignments[i].duedate = new Date(data.assignments[i].duedate);
						assignments.push(data.assignments[i]);
					}
				}
				// courses = [];
				// if (data.courses) {
				// 	for (var i = 0; i < data.courses.length; i++) {
				// 		for (var j = 0; j < data.courses[i].times.length; j++) {
				// 			data.courses[i].times[j].startTime = new Date(data.courses[i].times[j].startTime);
				// 			data.courses[i].times[j].endTime = new Date(data.courses[i].times[j].endTime);
				// 			courses.push(data.courses[i].times[j]);
				// 		}
				// 	}
				// }
			}
			refresh();
		}
	});
}
function save() {
	console.log("saving");
	var data = {
		assignments: assignments,
		courses: courses
	};
	fs.writeFile(path.join(app.getPath("userData"), "data.json"), JSON.stringify(data), () => {
		console.log("finished saving");
		load();
	});
}
function page(num) {
	console.log("page: " + num);
	for (var i = 0; i < document.getElementsByClassName("page").length; i++) {
		p = document.getElementsByClassName("page")[i];
		p.style.display = "none";
	}
	for (var i = 0; i < document.getElementById("topnav").getElementsByTagName("div").length; i++) {
		t = document.getElementById("topnav").getElementsByTagName("div")[i];
		t.classList.remove("active");
	}
	document
		.getElementById("topnav")
		.getElementsByTagName("div")
		[num - 1].classList.add("active");
	document.getElementsByClassName("page")[num - 1].style.display = "inherit";
}
function refresh() {
	document.getElementById("courses").innerHTML = "";
	document.getElementById("category").innerHTML = "";
	for (var i = 0; i < courses.length; i++) {
		var opt = document.createElement("option");
		opt.value = i;
		opt.innerHTML = courses[i].title;
		document.getElementById("courses").appendChild(opt);
	}
	for (var i = 0; i < assignmentCategories.length; i++) {
		var opt = document.createElement("option");
		opt.value = i;
		opt.innerHTML = assignmentCategories[i];
		document.getElementById("category").appendChild(opt);
	}

	var today = new Date();
	var monday = new Date();
	if (!currentWeek) {
		currentWeek = monday;
	} else {
		monday = currentWeek;
	}
	var thisWeek = [];
	var months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];
	var days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
	monday.setDate(monday.getDate() - monday.getDay() + 1);
	document.getElementById("weekTag").innerHTML = `Week of ${days[monday.getDay() - 1]}, ${
		months[monday.getMonth()]
	} ${monday.getDate()}`;
	for (var i = 0; i < assignments.length; i++) {
		assignment = assignments[i];
		if (assignment.duedate) {
			for (var j = 0; j < 7; j++) {
				var temp = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + j);
				if (sameDay(assignment.duedate, temp)) {
					thisWeek.push(assignment);
				}
			}
		}
	}
	document.getElementById("Test--container").innerHTML = "";
	document.getElementById("Project--container").innerHTML = "";
	document.getElementById("Event--container").innerHTML = "";
	for (var i = 0; i < thisWeek.length; i++) {
		var em = document.getElementById("Test--container");
		if (thisWeek[i].category == assignmentCategories[2]) em = document.getElementById("Project--container");
		if (thisWeek[i].category == assignmentCategories[1]) em = document.getElementById("Event--container");
		em.appendChild(weekAtAGlanceElement(thisWeek[i]));
	}
}

function weekAtAGlanceElement(assignment) {
	var months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];
	var div = document.createElement("div");
	var p = document.createElement("p");
	var btn = document.createElement("button");
	p.innerHTML = `${assignment.category} in ${assignment.title} on ${assignment.duedate.toLocaleDateString("en-US", {
		month: "long"
	})}`;
	if (assignment.status == assignmentStatuses[0]) {
		btn.innerHTML = "Start";
		div.classList.add("incomplete");
	} else if (assignment.status == assignmentStatuses[1]) {
		btn.innerHTML = "Finish";
		div.classList.add("inprogress");
	} else if (assignment.status == assignmentStatuses[2]) {
		btn.innerHTML = "Turn In";
		div.classList.add("complete");
	} else {
		btn.innerHTML = "&#x1f5d1;";
		div.classList.add("submitted");
	}
	if (btn.innerHTML != "") div.appendChild(btn);
	btn.onclick = function() {
		for (var i = 0; i < assignments.length; i++) {
			if (assignments[i] == assignment) {
				var idx = 0;
				for (var j = 0; j < assignmentStatuses.length; j++) {
					if (assignment.status == assignmentStatuses[j]) {
						idx = j;
					}
				}
				if (idx + 1 < assignmentStatuses.length) {
					assignments[i].status = assignmentStatuses[idx + 1];
				} else {
					assignments.splice(i, 1);
				}
			}
		}
		save();
	};
	div.appendChild(p);
	return div;
}

function sameDay(a, b) {
	return a.getFullYear() == b.getFullYear() && a.getDate() == b.getDate() && a.getMonth() == b.getMonth();
}

// sameDay(day) {
//     return this.dayOfWeek == day.getDay()
// }
// inRange(day) {
//     var after = (day.getHour > this.startTime.getHour()) || (day.getHour == this.startTime.getHour() && day.getMinutes() >= this.startTime.getMinutes())
//     var before = (day.getHour < this.endTime.getHour()) || (day.getHour == this.endTime.getHour() && day.getMinutes() <= this.endTime.getMinutes())
//     return after && before
// }

function incrementWeek() {
	currentWeek = new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() + 7);
	refresh();
}

function decrementWeek() {
	currentWeek = new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() - 7);
	refresh();
}
function resetWeek() {
	currentWeek = null;
	refresh();
}
