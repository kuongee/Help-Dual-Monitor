const {app, BrowserWindow} = require('electron')

let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    frame: false,
    width: 300,
    height: 200,
    resizable: false,
    backgroundColor: '#66CD00',
    autoHideMenuBar: true
  })

  mainWindow.loadFile('index.html')
}

app.on('ready', createWindow)

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})