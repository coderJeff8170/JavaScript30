// variables

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const controls = player.querySelector('.player__controls');
const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
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

function scrub (e) {
    console.log(`${e.offsetX}, ${e.offsetY}`);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    //^^ this interesting tidbit - the division produces a percentage of the played video, which you then multiply by the duration of the video - so if it's 50%, it's 50% OF the video.duration(length of the clip); Clever!
    video.currentTime = scrubTime;//instantly sets the progressBar to where you clicked!
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

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));//works great! but we want it to happen only when dragging so.. flag variable^^ mousedown starts out false!
//notice that we're using the 'truthiness' of the logical AND to hijack functionality - scrub will only work if both expressions are true. If mousedown is false, scrub never gets called... Remember to put that event in there, as we need the offset values from it...If you need info from a click, you gotta get the info from the event.
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
//oh my god will I ever be able to think like this???