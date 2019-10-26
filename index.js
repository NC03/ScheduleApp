var assignments = []

console.log(process)

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
    for(category of new Assignment().categories)
    {
        inner += `<option value=\"${count}\">${category}</option>`
        count++
    }
    document.getElementById("category").innerHTML = inner


    document.getElementById("submit").addEventListener("click",() =>{
        var course = courses[document.getElementById("select").selectedIndex]
        var title = document.getElementById("text").value
        var category = new Assignment().categories[document.getElementById("category").selectedIndex]
        var date = new Date(document.getElementById("date__input").value)
        var assignment = new Assignment(date,course,title,category)
        console.log(date)
        console.log(document.getElementById("date__input").value)
        assignments.push(assignment)
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