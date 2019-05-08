const electron = require('electron')
const { ipcRenderer } = require('electron')
ipcRenderer.on('dualDisplay', (event, arg) => {
    inputSelect = document.getElementsByClassName('command');
    for(const i in inputSelect) {
        inputSelect[i].disabled = false;
    }
})

function sendMessage(arg) {
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
    let info = {
        message: arg,
        width: width,
        height: height
    }
    console.log("Send message : ", info.message); 
    ipcRenderer.send('synchronous-message', info);
}

document.getElementById("play").addEventListener("click", () => { sendMessage('play') });
document.getElementById("stop").addEventListener("click", () => { sendMessage('stop') });