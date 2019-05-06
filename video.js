const { desktopCapturer, ipcRenderer } = require('electron')

let width = window.innerWidth - 20;
let height = window.innerHeight - 20;
let video = document.querySelector('video');
video.width = width;
video.height = height;

ipcRenderer.on('videoCommand', (event, arg) => {
  if (arg === 'play') {
    captureVideo();
  }
  else if (arg === 'stop') {
    stopVideo();
  }
})

function captureVideo() {
  desktopCapturer.getSources({ types: ['window', 'screen'] }, (error, sources) => {
    if (error) throw error
        console.log(sources);
    for (let i = 0; i < sources.length; ++i) {
      if (sources[i].name === 'Screen 1') {
        navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: sources[i].id,
              minWidth: 1366,
              maxWidth: 1366,
              minHeight: 768,
              maxHeight:768 
            }
          }
        }).then((stream) => handleStream(stream))
          .catch((e) => handleError(e))
        return
      }
    }
  })

  function handleStream(stream) {
    const video = document.querySelector('video');
    video.srcObject = stream;
    video.onloadedmetadata = (e) => video.play();
  }

  function handleError(e) {
    console.log(e)
  }
}

function stopVideo() {
  const video = document.querySelector('video');
  if (!video.paused)
    video.pause();
}