var assignments = []

const fs = require("fs")
const path = require("path")

document.addEventListener("DOMContentLoaded", () => {
    page(1)
    fs.readFile(path.join(app.getPath("userData"), "data.json"), "utf-8", (err, data) => {
        if (err && data == null) {

        } else {
            assignments = JSON.parse(data)
            refresh()
        }
    })
})

function save() {
    s.writeFile(path.join(app.getPath("userData"), "data.json"), JSON.stringify(assignments))
}


function page(num) {
    console.log(num)
    for (var i = 0; i < 3; i++) {
        document.getElementsByClassName("page")[i].setAttribute("style", "display:none")
        document.getElementById("topnav").getElementsByTagName("div")[i].classList.remove("active")
    }
    document.getElementById("topnav").getElementsByTagName("div")[num - 1].classList.add("active")
    document.getElementsByClassName("page")[num - 1].setAttribute("style", "display:inherit")

}


function createBtn(assignment) {
    var d = document.createElement("BUTTON");
    d.innerHTML = "&#x2261;";
    d.addEventListener("click", function () {

        populate(assignment)
    })
    return d
}

function refresh() {
    document.getElementById("Test--container").innerHTML = "";
    document.querySelector("#Project--container").innerHTML = "";
    document.getElementById("Event--container").innerHTML = "";

    for (assignment of assignments) {
        if (assignment.category != "Assignment") {
            var em = document.createElement("DIV");
            em.addEventListener("click", (arg) => {
                console.log(arg)
            })
            var months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "July",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec"
            ]
            em.innerHTML = assignment.category + ": " + assignment.title + " in " + assignment.course.title + " on " + months[assignment.duedate.getMonth()] + " " + (assignment.duedate.getDate() + 1);

            em.appendChild(createBtn(assignment));
            document.getElementById(assignment.category + "--container").appendChild(em);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    var inner = ""
    var count = 1
    for (course of courses) {
        inner += `<option value=\"${count}\">${course.title}</option>`
        count++
    }
    document.getElementById("select").innerHTML = inner

    inner = ""
    count = 1
    for (category of new Assignment().categories) {
        inner += `<option value=\"${count}\">${category}</option>`
        count++
    }
    document.getElementById("category").innerHTML = inner


    document.getElementById("submit").addEventListener("click", () => {
        var course = courses[document.getElementById("select").selectedIndex]
        var title = document.getElementById("text").value
        var category = new Assignment().categories[document.getElementById("category").selectedIndex]
        var arr = document.getElementById("date__input").value.split("-");
        console.log(document.getElementById("date__input").value)
        console.log(arr)
        var date = new Date(document.getElementById("date__input").value)
        var assignment = new Assignment(date, course, title, category)
        console.log(date)
        console.log(document.getElementById("date__input").value)
        assignments.push(assignment)
        refresh()
        console.log(assignments)
    })
})

// document.getElementById('basic-noti').addEventListener('click', () => {
//     var notification = { title: null, body: null }
//     var date = new Date()
//     notification.title="Date:"
//     notification.body=date.getDate()+"/"+date.getMonth()+"/"+(date.getYear()+1900)

//     // fetchData()

//     const myNotification = new window.Notification(notification.title, notification)

//     myNotification.onclick = () => {
//         console.log('Notification clicked')
//     }
// })