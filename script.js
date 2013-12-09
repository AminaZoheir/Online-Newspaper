var video;
var scale = 0.5;
window.onload = function() {

  // Video
  video = document.getElementById("video");

  // Buttons
  playButtonEvent();
  muteButtonEvent();

  // Sliders
  seekBarEvent();
  volumeBarEvent();

  grayscaleImg();

  setInterval(captureVideo, 100);
}

function playButtonEvent(){
    var playButton = document.getElementById("play-pause");
    playButton.addEventListener("click", function() {
      if (video.paused == true) {
        // Play the video
        video.play();
        if(video.currentTime == 0){
            var seekBar = document.getElementById("seek-bar");
            seekBar.value = 0;
        }
        // Update the button text to 'Pause'
        playButton.innerHTML = "Pause";
      } else {
        // Pause the video
        video.pause();

        // Update the button text to 'Play'
        playButton.innerHTML = "Play";
      }
    });
}

function muteButtonEvent(){
    var muteButton = document.getElementById("mute");
    muteButton.addEventListener("click", function() {
      if (video.muted == false) {
        // Mute the video
        video.muted = true;

        // Update the button text
        muteButton.innerHTML = "Unmute";
      } else {
        // Unmute the video
        video.muted = false;

        // Update the button text
        muteButton.innerHTML = "Mute";
      }
    });
}

function seekBarEvent(){
    var seekBar = document.getElementById("seek-bar");
    seekBar.addEventListener("change", function() {
      // Calculate the new time
      var time = video.duration * (seekBar.value / 100);

      // Update the video time
      video.currentTime = time;

      if(time == video.duration){
        var playButton = document.getElementById("play-pause");
        playButton.innerHTML = "Play";
      }

    });
}

function volumeBarEvent(){
    var volumeBar = document.getElementById("volume-bar");
    volumeBar.addEventListener("change", function() {
      // Update the video volume
      video.volume = volumeBar.value;
    });
}

function captureVideo(){
  var seekBar = document.getElementById("seek-bar");
  seekBar.value = (video.currentTime/video.duration) *  100;
  var canvas = document.getElementById("grayscale-video");
    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    //var img = document.createElement("img");
   // img.src = canvas.toDataURL();
    //$output.prepend(canvas);
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for(var i = 0; i < data.length; i += 4) {
      var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
      // red
      data[i] = brightness;
      // green
      data[i + 1] = brightness;
      // blue
      data[i + 2] = brightness;
    }

    // overwrite original image
    context.putImageData(imageData, 0, 0);
}

function grayscaleImg(){
  var img = document.getElementById("balloons");
  var canvas = createElement('canvas');
  var context = canvas.getContext('2d');
  context.drawImage(img, 0, 0, canvas.width, canvas.height);

  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;
  for(var i = 0; i < data.length; i += 4) {
    var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
    // red
    data[i] = brightness;
    // green
    data[i + 1] = brightness;
    // blue
    data[i + 2] = brightness;
  }

  // overwrite original image
  context.putImageData(imageData, 0, 0);
}
