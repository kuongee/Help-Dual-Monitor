const electron = require('electron')
const { app, BrowserWindow, Menu, ipcMain } = require('electron')

let mainWindow
let childWindow
let borderWindow

function createMainWindow() {
  // Create the main control window.
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

function createChildWindow(workArea) {
  // Create the video window
  childWindow = new BrowserWindow({
    parent: mainWindow,
    x: workArea.x,
    y: workArea.y,
    width: workArea.width,
    height: workArea.height,
  });
  childWindow.loadURL('file://' + __dirname + '/child.html');
}

function createWindow() {
  let displays = electron.screen.getAllDisplays();
  let dualDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  });

  createMainWindow();

  if (dualDisplay) {
    // send dual monitor event
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.send('dualDisplay', 'false');
    })

    let workArea = {
      x: dualDisplay.bounds.x,
      y: dualDisplay.bounds.y,
      width: dualDisplay.bounds.width,
      height: dualDisplay.bounds.height
    }
    createChildWindow(workArea);
  }
}

ipcMain.on('synchronous-message', (event, arg) => {
  console.log("Main process " + arg.message);
  childWindow.webContents.send('videoCommand', arg);
});

app.on('ready', () => {
  createWindow();

  /* open dev tools in each window */
  //mainWindow.webContents.openDevTools();
  //childWindow.webContents.openDevTools();
  console.log("ready");
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
})