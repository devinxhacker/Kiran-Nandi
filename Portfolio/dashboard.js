window.onload = function () {
    var body = document.getElementsByTagName("body")[0];
    body.style.overflow = "hidden";
    var sp = document.getElementById("splash");
    sp.style.display = "block";
    setTimeout(function () {
        sp.style.transform = "translateY(-100%)";
    }, 3000);
    play();
    body.style.overflow = "auto";
    var audio = document.getElementById("audio");
    var icon = document.getElementById("audio-toggler");
    audio.addEventListener("pause",function(){
        if (audio.paused) {
            icon.classList.remove("fa-pause");
            icon.classList.add("fa-play");
        } else {
            icon.classList.remove("fa-play");
            icon.classList.add("fa-pause");
        }
    })

    audio.addEventListener("play",function(){
        if (audio.paused) {
            icon.classList.remove("fa-pause");
            icon.classList.add("fa-play");
        } else {
            icon.classList.remove("fa-play");
            icon.classList.add("fa-pause");
        }
    })

}


function toggleAudio(){
    var audio = document.getElementById("audio");
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }

    var icon = document.getElementById("audio-toggler");
    if (icon.classList.contains("fa-pause")) {
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
    } else {
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
    }
}

function deblur() {
    var canvas = document.getElementById("canvas2");
    if (canvas.style.display == "none") {
        canvas.style.display = "block";
    }
    else{
        canvas.style.display = "none";
    }

    var icon = document.getElementById("deblur-toggler");
    if (icon.classList.contains("fa-eye")) {
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}


function display_container(){
    var container = document.getElementsByClassName("container")[0];
    if (container.style.display == "grid" ) {
        container.style.display = "none";
    }
    else{
        container.style.display = "grid";
    }

    var icon = document.getElementById("container_toggler");
    if (icon.classList.contains("fa-angle-down")) {
        icon.classList.remove("fa-angle-down");
        icon.classList.add("fa-angle-up");
    } else {
        icon.classList.remove("fa-angle-up");
        icon.classList.add("fa-angle-down");
    }
}

function random_music(audio) {
    audio.pause();
    audio.currentTime = 0;
    var rand = Math.floor(Math.random() * 3) + 1;
    audio.src = "musics/audio" + 1 + ".mp3";
    audio.play();
    // It should play other audio when the first one ends
    audio.addEventListener("ended", function () {
        random_music(audio);
    })
    // audio.loop = true;
}

function play() {
    var pls = document.getElementById("play_screen");
    var pl = document.getElementById("lets_play");
    var body = document.getElementsByTagName("body")[0];
    pl.addEventListener("click", function () {
        body.requestFullscreen();
        pls.style.transform = "translateY(100%)";
        aplay();
    })
}

function aplay() {
    var audio = document.getElementById("audio");
    random_music(audio);
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    console.log(WIDTH, HEIGHT);

    var barWidth = (WIDTH / bufferLength) * 2;
    var barHeight;
    var x = 0;

    console.log(barWidth, barHeight, x);

    function renderFrame() {
        requestAnimationFrame(renderFrame);

        x = 0;

        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            var r = barHeight + (10 * (i / bufferLength));
            var g = 250 * (i / bufferLength);
            var b = 250;

            ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
    }


    audio.play();
    renderFrame();
};

