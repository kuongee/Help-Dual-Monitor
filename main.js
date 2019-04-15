const { app, BrowserWindow, Menu } = require('electron')


let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    //frame: false,
    width: 500,
    height: 500,
    minWidth: 300,
    minHeight: 200,
    resizable: true,
    backgroundColor: '#F4C242',
  });
  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools();
  Menu.setApplicationMenu(null);
  console.log("here");
}

app.on('ready', createWindow)

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
})