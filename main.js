const { app, BrowserWindow, Menu, MenuItem } = require('electron')
const url = require('url')
const path = require('path')

let win

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600
    })

    console.log(process)
    win.loadFile('index.html')

    win.webContents.openDevTools()

    win.on("ready", function () {

    })

    win.on('closed', function () {

        win = null
    })
}


app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (win === null) createWindow()
})
