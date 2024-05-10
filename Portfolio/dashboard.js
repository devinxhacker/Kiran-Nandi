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
    audio.play();
    audio.loop = true;
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

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
        requestAnimationFrame(renderFrame);

        x = 0;

        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            var r = barHeight + (25 * (i / bufferLength));
            var g = 250 * (i / bufferLength);
            var b = 50;

            ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
    }

    audio.play();
    renderFrame();
};



