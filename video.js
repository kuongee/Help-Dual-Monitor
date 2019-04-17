const { desktopCapturer } = require('electron')

function captureVideo() {
  desktopCapturer.getSources({ types: ['window', 'screen'] }, (error, sources) => {
    if (error) throw error
    for (let i = 0; i < sources.length; ++i) {
      if (sources[i].name === 'Screen 2') {
        navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: sources[i].id,
              minWidth: 720,
              maxWidth: 720,
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

document.getElementById("capture").addEventListener("click", function () {
  captureVideo();
}); 