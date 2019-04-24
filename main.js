const { app, BrowserWindow, Menu } = require('electron')


let mainWindow
let childWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow ({
    //frame: false,
    width: 500,
    height: 500,
    minWidth: 300,
    minHeight: 200,
    resizable: true,
    backgroundColor: '#F4C242',
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.webContents.openDevTools();
  Menu.setApplicationMenu(null);

  childWindow = new BrowserWindow ({
    width: 500,
    height: 500,
  })
  childWindow.loadURL('file://' + __dirname + '/child.html');

  console.log("here");
}

app.on('ready', createWindow)

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
})