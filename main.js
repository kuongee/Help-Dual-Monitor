const electron = require('electron')
const { app, BrowserWindow, Menu, ipcMain } = require('electron')

let mainWindow
let childWindow
let borderWindow

let currentMainScreen = 1;

function setMainWindow(workArea) {
  // Set the main control window.
  mainWindow.setBounds({
    x: workArea.x,
    y: workArea.y,
    width: 300,
    height: 200,
  })
  mainWindow.center();
}

function setChildWindow(workArea) {
  // Set the video window
  childWindow.setBounds({
    x: workArea.x,
    y: workArea.y,
    width: workArea.width,
    height: workArea.height,
  });
  childWindow.setFullScreen(true);
}

function initWindows() {
  mainWindow = new BrowserWindow({
    resizable: false,
    backgroundColor: '#F4C242',
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  childWindow = new BrowserWindow({
    parent: mainWindow,
  });
  childWindow.loadURL('file://' + __dirname + '/child.html');
  Menu.setApplicationMenu(null);

  /* open dev tools in each window */
  //mainWindow.webContents.openDevTools();
  childWindow.webContents.openDevTools();
}

function createWindow() {
  let displays = electron.screen.getAllDisplays();
  let dualDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  });

  if (dualDisplay) {
    initWindows();
    setMainWindow(displays[0].bounds);

    // send dual monitor event
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.send('dualDisplay', 'false');
    })

    setChildWindow(dualDisplay.bounds);
  }
}

function switchScreenNumber() {
  let displays = electron.screen.getAllDisplays();
  let Screen1 = displays[0].bounds;
  let Screen2 = displays[1].bounds;
  if (currentMainScreen === 1) {
    setMainWindow(Screen2);
    setChildWindow(Screen1);
    currentMainScreen = 2;
  }
  else {
    setMainWindow(Screen1);
    setChildWindow(Screen2);
    currentMainScreen = 1;
  }
}

ipcMain.on('synchronous-message', (event, arg) => {
  console.log("Main process " + arg.message);
  if (arg.message === 'change') {
    switchScreenNumber();
  }
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  let info = {
    message: arg.message,
    width: width,
    height: height
  }
  childWindow.webContents.send('videoCommand', info);
});

app.on('ready', () => {
  createWindow();

  console.log("ready");
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
})