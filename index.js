var assignments = []


document.addEventListener('DOMContentLoaded', () => {
    var inner = ""
    var count = 1
    for (course of courses) {
        console.log(course)
        inner += `<option value=\"${count}\">${course.title}</option>`
        count++
    }
    document.getElementById("select").innerHTML = inner


    document.getElementById("submit").addEventListener("click",() =>{
        var course = coureses[document.getElementById("select").selectedIndex]
        var title = document.getElementById("text").innerText
        var assignment = new Assignment(duedate,course,title)
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