document.getElementById('basic-noti').addEventListener('click', () => {
    var notification = { title: null, body: null }
    var date = new Date()
    notification.title="Date:"
    notification.body=date.getDate()+"/"+date.getMonth()+"/"+(date.getYear()+1900)
    

    const myNotification = new window.Notification(notification.title, notification)

    myNotification.onclick = () => {
        console.log('Notification clicked')
    }
})