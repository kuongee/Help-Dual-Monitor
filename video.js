const { desktopCapturer, ipcRenderer } = require("electron");

let width = window.innerWidth - 20;
let height = window.innerHeight - 20;
let video = document.querySelector("video");
video.width = width;
video.height = height;

let currentCaptureScreen = "Screen 1";

ipcRenderer.on("videoCommand", (event, arg) => {
  if (arg.message === "play") {
    captureVideo(arg.width, arg.height);
  } else if (arg.message === "stop") {
    stopVideo();
  } else if (arg.message === "change") {
    currentCaptureScreen =
      currentCaptureScreen === "Screen 1" ? "Screen 2" : "Screen 1";
    const video = document.querySelector("video");
    if (video.played) captureVideo(arg.width, arg.height);
  }
});

function captureVideo(mainWidth, mainHeight) {
  desktopCapturer.getSources(
    { types: ["window", "screen"] },
    (error, sources) => {
      if (error) throw error;
      for (let i = 0; i < sources.length; ++i) {
        if (sources[i].name === currentCaptureScreen) {
          navigator.mediaDevices
            .getUserMedia({
              audio: false,
              video: {
                mandatory: {
                  chromeMediaSource: "desktop",
                  chromeMediaSourceId: sources[i].id,
                  minWidth: mainWidth,
                  maxWidth: mainWidth,
                  minHeight: mainHeight,
                  maxHeight: mainHeight
                }
              }
            })
            .then(stream => handleStream(stream))
            .catch(e => handleError(e));
          return;
        }
      }
    }
  );

  function handleStream(stream) {
    const video = document.querySelector("video");
    video.srcObject = stream;
    video.onloadedmetadata = e => video.play();
  }

  function handleError(e) {
    console.log(e);
  }
}

function stopVideo() {
  const video = document.querySelector("video");
  if (!video.paused) video.pause();
}
