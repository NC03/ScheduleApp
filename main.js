const { app, BrowserWindow, Menu, MenuItem } = require('electron')
const url = require('url')
const path = require('path')

let win

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600
    })
    win.loadFile('index.html')
    win.webContents.openDevTools()
    
    win.on('closed', function () {
        win = null
    })
}
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})
