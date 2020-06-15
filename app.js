const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.video-container video');

  //sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  //time display
  const timeDisplay = document.querySelector('.time-display');
  const timeSelect = document.querySelectorAll(".time-select button");
  //get the length of the outline
  const outlineLength = outline.getTotalLength();
  console.log(outlineLength);
  //Duration
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //Play different sounds
  var okay = document.getElementById("data-sound");
  sounds.forEach(sound =>{
    sound.addEventListener('click', function(){
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    });
  });

  //play sounds

  play.addEventListener('click', () => {
    checkPlaying(song);
  });

//Select sound durations
timeSelect.forEach(option => {
  option.addEventListener ('click', function(){
    fakeDuration = this.getAttribute('data-time');
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}}`;
  });
});

  //Create a function specific to stop and play the sounds

  const checkPlaying = song => {
    if(song.paused){
      song.play();
      video.play();

      play.src = './svg/pause.svg';
    }else{
      song.pause();
      video.pause();
      play.src = './svg/play.svg';
    }
  };

//Getting the animation done
song.ontimeupdate = () => {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);

  //Animating the circle
  let progress = outlineLength - (currentTime / fakeDuration)  * outlineLength;
  outline.style.strokeDashoffset = progress;

  //Animating the text
  timeDisplay.textContent = `${minutes}:${seconds}`;

  if(currentTime >= fakeDuration){
    song.pause();
    song.currentTime = 0;
    play.src = './svg/play.svg';
    video.pause();
  }
};

};

app();
