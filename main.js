const { app, BrowserWindow, Menu, MenuItem } = require('electron')
const url = require('url')
const path = require('path')
const fs = require("fs")

let win
var data

function fetchData() {
    console.log(path.join(app.getPath(), "data.txt"))
    fs.readFile(path.join(app.getPath(), "data.txt"), (err, data) => {
        console.log(data)
    })
}


function createWindow() {
    // Menu.setApplicationMenu(null)

    win = new BrowserWindow({
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

}


app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
    js.writeFile(path.join(app.getPath("userData"),"data.json"),JSON.stringify(assignments))
})

app.on('activate', function () {
    if (win === null) createWindow()
})

fs.readFile(path.join(app.getPath("userData"),"data.json"),"utf-8",(err,data)=>{
    if (err && data == null){

    }else{
        assignments = JSON.parse(data)
        // win.webContents.on("did-finish-load",()=>{
        //     win.webContents.executeJavaScript(`var assignments = ${data};`)
        // })
    }
})

