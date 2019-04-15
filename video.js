const { desktopCapturer } = require('electron')

function captureVideo() {
  desktopCapturer.getSources({ types: ['window', 'screen'] }, (error, sources) => {
    if (error) throw error

    for (let i = 0; i < sources.length; ++i) {
      if (sources[i].name === 'My App') {
        navigator.webkitGetUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: sources[i].id,
              audio: false,
              minWidth: 1280,
              maxWidth: 1280,
              minHeight: 720,
              maxHeight: 720
            }
          }
        }, handleStream, handleError);
        return;
      }
    }
  })

  function handleStream(stream) {
    document.querySelector('video').src = URL.createObjectURL(stream)
  }

  function handleError(e) {
    console.log(e)
  }

}

document.getElementById("capture").addEventListener("click", function () {
  captureVideo();
}); 