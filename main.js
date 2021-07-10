const {app, BrowserWindow} = require('electron');

function createWindow() {
    // Create main window with some default setting.
    const win = new BrowserWindow({
        minWidth: 1000,
        minHeight: 700,
        icon: "app-icon.ico",
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    win.loadFile("index.html");
    win.setMenuBarVisibility(false);
}

// Call the "createWindow" function when the app is ready to start.
app.whenReady().then(createWindow);