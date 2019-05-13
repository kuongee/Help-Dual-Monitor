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

document.getElementById("play").addEventListener("click", () => { sendMessage('play') });
document.getElementById("stop").addEventListener("click", () => { sendMessage('stop') });
document.getElementById("change").addEventListener("click", () => { sendMessage('change') });