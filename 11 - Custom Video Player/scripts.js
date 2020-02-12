// variables

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const controls = player.querySelector('.player__controls');
const progress = controls.querySelector('.progress');
const progressFilled = progress.querySelector('.progress__filled');
const toggle = controls.querySelector('.toggle');
//const skipFwd = controls.querySelector('.player__button[data-skip="25"]');
//const skipBwd = controls.querySelector('.player__button[data-skip="-10"]');
const skipButtons = player.querySelectorAll('[data-skip]');
//const sliderVol = controls.querySelector('.player__slider[name="volume"]');
//const sliderSpeed = controls.querySelector('.player__slider[name="playbackRate"]');
const ranges = player.querySelectorAll('.player__slider');
// functions

function togglePlay() {
    // the object through which video is played is the video tag with class .viewer..
    const method = video.paused ? 'play' : 'pause';//very cool use of the ternary
    video[method]();
}

function updateButton () {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;//puts the above characters into where the play button is..
}

function skip () {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);//you gotta parseFloat this, to make it a true number. 
}

function handleRanges() {
    console.log(this.value);
    video[this.name] = this.value;
    //range.value += this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration)* 100;
    progressFilled.style.flexBasis = `${percent}%`;
}


//event listeners


video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);//you need both play and pause to toggle the icon!!
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
// skipFwd.addEventListener('click', skip);
// skipBwd.addEventListener('click', skip);
skipButtons.forEach(button => button.addEventListener('click', skip));//how fucking cool! You can forEach the node list, and add even listeners with a fat arrow function!
ranges.forEach(range => range.addEventListener('change', handleRanges));
ranges.forEach(range => range.addEventListener('mousemove', handleRanges));
