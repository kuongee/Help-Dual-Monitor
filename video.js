const { desktopCapturer, ipcRenderer } = require('electron')
ipcRenderer.on('videoCommand', (event, arg) => {
  console.log("Get " + arg);
  if (arg === 'play')
    captureVideo();
  else if (arg === 'stop')
    stopVideo();
})

function captureVideo() {
  desktopCapturer.getSources({ types: ['window', 'screen'] }, (error, sources) => {
    if (error) throw error
    for (let i = 0; i < sources.length; ++i) {
      if (sources[i].name === 'Screen 1') {
        navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: sources[i].id,
              minWidth: 720,
              maxWidth: 1280,
              minHeight: 720,
              maxHeight: 720
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
  if(!video.paused)
    video.pause();
}