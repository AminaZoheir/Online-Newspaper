var video;
var scale = 0.5;

var guardian = "http://content.guardianapis.com/search?tag=news&show-fields=all&api-key=8ftf572yrfzzv8hct7hyc5mn";

window.onload = function() {
  poll_news();
//   if(typeof(Worker)!=="undefined")
//   {
//   var v = new Worker("video.js");
//   //var p = new Worker("poller.js");
//   }
// else
//   {
//   // Sorry! No Web Worker support..
//   }
  // Video
  video = document.getElementById("video");

 	var DateTime = new Date();
 	var strYear= DateTime.getFullYear();
  var strMonth= DateTime.getMonth();
  var month_name=new Array(12);
 	month_name[0]="January"
 	month_name[1]="February"
	month_name[2]="March"
	month_name[3]="April"
	month_name[4]="May"
	month_name[5]="June"
	month_name[6]="July"
	month_name[7]="August"
	month_name[8]="September"
	month_name[9]="October"
	month_name[10]="November"     
	month_name[11]="December"
  var strDay = DateTime.getDate();
	var weekday=new Array(7);
	weekday[0]="Sunday";
	weekday[1]="Monday";
	weekday[2]="Tuesday";	
	weekday[3]="Wednesday";
	weekday[4]="Thursday";
	weekday[5]="Friday";
	weekday[6]="Saturday";
  var tagDiv=document.getElementById("date");
  tagDiv.innerText = weekday[DateTime.getDay()]+" "+ month_name[strMonth] + " "+ strDay + ", "  + " " + strYear;

  // Buttons
  playButtonEvent();
  muteButtonEvent();

  // Sliders
  seekBarEvent();
  volumeBarEvent();

  setInterval(captureVideo, 100);

  grayscaleImg();
  
  $('#grayscale-img').click(function(){
  	$('#grayscale-img').css("position","absolute");
  	$('#grayscale-img').css("bottom","10px");
  	$('#grayscale-img').css("right","10px");
  	$('#grayscale-img').animate({top: "50px",}, 1000);
  });

}



function poll_news(){
  $.ajax({
    url: guardian,
    data: 'application/json',
    dataType: 'jsonp',
    success: function(data) // Variable data contains the data we get from serverside
    {      
      for(var i = data.response.results.length-1; i>=0;i--){
        if($(data.response.results[i].fields.body).attr("src")){
            var news_wrapper = $("<div class='item_news'><h3></h3><p class='item'></p></div>");
            news_wrapper.find('h3').html(data.response.results[i].webTitle);
            news_wrapper.find('p').html(data.response.results[i].fields.body);
            $('.wrapper').prepend(news_wrapper);
        }
      }
      $('.block-time').remove();
      $('.gu_advert').remove();
      $('.wrapper').hide();
      $('.wrapper').fadeIn(500);
      setTimeout(poll_news,1800000);
    },error: function(data){
      console.log(data);
    }
  });
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
  var canvas = document.getElementById("grayscale-img");
  var context = canvas.getContext('2d');
  context.drawImage(img, 0, 0);

  var imageData = context.getImageData(0, 0, img.width, img.height);
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
