// variables

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const controls = player.querySelector('.player__controls');
const progress = controls.querySelector('.progress');
const progressFilled = progress.querySelector('.progress__filled');
const toggle = controls.querySelector('.toggle');
const skipFwd = controls.querySelector('.player__button[data-skip="25"]');
const skipBwd = controls.querySelector('.player__button[data-skip="-10"]');
const sliderVol = controls.querySelector('.player__slider[name="volume"]');
const sliderSpeed = controls.querySelector('.player__slider[name="playbackRate"]');

// functions

function togglePlay() {
    // the object through which video is played is the video tag with class .viewer..
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}