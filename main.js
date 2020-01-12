const { app, BrowserWindow, Menu, MenuItem } = require("electron");
const path = require("path");

let win;

function createWindow() {
	win = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true
		},
		width: 800,
		height: 600,
		icon: "icon.png"
	});

	win.loadFile(path.join(__dirname, "index.html"));
	win.webContents.openDevTools();
	win.on("closed", function() {
		win = null;
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", function() {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", function() {
	if (win === null) createWindow();
});
