const electron = require('electron')
const { app, BrowserWindow, Menu, ipcMain } = require('electron')


let mainWindow
let childWindow

function createMainWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    //frame: false,
    width: 300,
    height: 200,
    resizable: false,
    backgroundColor: '#F4C242',
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  Menu.setApplicationMenu(null);
}

function createChildWindow(position) {
  childWindow = new BrowserWindow({
    x: position.x,
    y: position.y,
    width: 500,
    height: 500,
  })
  childWindow.loadURL('file://' + __dirname + '/child.html');
}

ipcMain.on('synchronous-message', (event, arg) => {
  console.log("Main process " + arg);
  childWindow.webContents.send('videoStart', arg);
});

app.on('ready', () => {
  let displays = electron.screen.getAllDisplays()
  console.log(displays);
  let dualDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })

  createMainWindow();
  if(dualDisplay) {
    let position = {
      x: dualDisplay.bounds.x + 50,
      y: dualDisplay.bounds.y + 50
    }
    createChildWindow(position) 
  }

  /* open dev tools in each window */
  mainWindow.webContents.openDevTools();
  childWindow.webContents.openDevTools();

  console.log("here");
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
})