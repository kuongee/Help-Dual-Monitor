const { ipcRenderer } = require('electron')
ipcRenderer.on('dualDisplay', (event, arg) => {
    inputSelect = document.getElementsByClassName('command');
    for(const i in inputSelect) {
        inputSelect[i].disabled = false;
    }
})

function sendMessage(arg) {
    let info = {
        message: arg,
    }
    console.log("Send message : ", info.message); 
    ipcRenderer.send('synchronous-message', info);
}

document.getElementById("play").addEventListener("click", () => { sendMessage('play') }, false);
document.getElementById("stop").addEventListener("click", () => { sendMessage('stop') }, false);
document.getElementById("change").addEventListener("click", () => { sendMessage('change') }, false);

function closeWindow() {
    var app = require('electron').remote;
    app.BrowserWindow.getFocusedWindow().close();
}

document.getElementById("close").addEventListener("click", () => { closeWindow() });