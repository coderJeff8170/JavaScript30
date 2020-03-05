const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo () {

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            console.log(localMediaStream);
            //video.src = window.URL.createObjectURL(localMediaStream); deprecated!!
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.err('Oh NOes!', err);
        });
        
}

function paintToCanvas () {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(()=>{
        ctx.drawImage(video, 0, 0, width, height);
    }, 16);//return this in case you need to grab it so you can clear it!

    console.log(width, height);
}

function takePhoto() {
    //plays sound
    snap.currentTime = 0;
    snap.play();
    //take data out of canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'OldMan');
    link.innerHTML = `<img src='${data}' alt='handsome dude'/>`;
    strip.insertBefore(link, strip.firstChild);
}


getVideo();

//event listeners

video.addEventListener('canplay', paintToCanvas);//don't 'call' paint to canvas, or it won't be an object...