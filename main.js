const { app, BrowserWindow } = require("electron")

let win

function createWindow() {
    console.log(process)
    win = new BrowserWindow({ width: 800, height: 600 })
    win.loadFile("index.html")
    win.webContents.openDevTools()

    win.on('closed', function () {

        win = null
    })
}

app.on('activate', function () {
    if (win === null) createWindow()
})
app.on("start", createWindow)
