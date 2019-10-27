const { app, BrowserWindow, Menu, MenuItem } = require('electron')
const url = require('url')
const path = require('path')
const fs = require("fs")

let win


function createWindow() {
    Menu.setApplicationMenu(null)

    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 800,
        height: 600,
        icon: "icon.png"
    })

    win.loadFile('splash.html')
    // win.webContents.openDevTools()
    win.on("ready", function () {
        console.log(app)
        console.log(app.getPath)
        console.log(app.getPath())
    })

    win.on('closed', function () {
        win = null
    })

    setTimeout(() => {
        win.loadFile("index.html")
    }, 1500)

    win.webContents.on("did-finish-load",()=>{
        win.webContents.executeJavaScript(`var pathInput = ${app.getPath("userData")}\n`)
    })

}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (win === null) createWindow()
})
