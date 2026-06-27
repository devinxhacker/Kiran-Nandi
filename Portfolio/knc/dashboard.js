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
    // var video = document.getElementById("video");
    // video.pause();
    // video.currentTime = 0;
    audio.pause();
    audio.currentTime = 0;
    var rand = Math.floor(Math.random() * 9) + 1;
    audio.src = "musics/audio" + rand + ".mp3";
    // audio.src = "musics/Astronomia - Minecraft Noteblock - Abtmelody.mp3";
    audio.play();
    // video.play();
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

// function aplay() {
//     var audio = document.getElementById("audio");
//     random_music(audio);
//     var context = new AudioContext();
//     var src = context.createMediaElementSource(audio);
//     var analyser = context.createAnalyser();

//     var canvas = document.getElementById("canvas");
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     var ctx = canvas.getContext("2d");

//     src.connect(analyser);
//     analyser.connect(context.destination);

//     analyser.fftSize = 256;

//     var bufferLength = analyser.frequencyBinCount;
//     console.log(bufferLength);

//     var dataArray = new Uint8Array(bufferLength);

//     var WIDTH = canvas.width;
//     var HEIGHT = canvas.height;

//     console.log(WIDTH, HEIGHT);

//     var barWidth = (WIDTH / bufferLength) * 2;
//     var barHeight;
//     var x = 0;

//     console.log(barWidth, barHeight, x);

//     function getMean(arr) {
//         if (arr.length === 0) return 0; // edge case
//         const sum = arr.reduce((acc, val) => acc + val, 0);
//         return sum / arr.length;
//       }
      


//     // Add the style switching logic
//     let style = 0; // Initialize style here (0 for side bars taller, 1 for middle bars taller)
//     analyser.getByteFrequencyData(dataArray);
//     setInterval(() => {
//         style = 1 - style; // Toggle between 0 and 1
//     }, (255 - getMean(dataArray)) * (3000 / 255)); // Change style every 2-3 seconds (adjust as needed)
//     console.log("Timer: " + (255 - getMean(dataArray)) * (3000 / 255))
//     function getBarStyle(i, bufferLength) {
//         if (style === 0) {
//             // Side bars taller
//             if (i < bufferLength * 0.13 || i > bufferLength * 0.35) {
//                 // random number from 0.0 to 0.2
//                 return dataArray[i] * 0.01; // Increase height for side bars
//             }
//         } else {
//             // Middle bars taller
//             if (i >= bufferLength * 0.13 && i <= bufferLength * 0.35) {
//                 return dataArray[i] * 0.01; // Increase height for middle bars
//             }
//         }
//         return 0.7; // Default height
//     }

//     function renderFrame() {
//         requestAnimationFrame(renderFrame);

//         x = 0;

//         analyser.getByteFrequencyData(dataArray);

//         ctx.fillStyle = "#000";
//         ctx.fillRect(0, 0, WIDTH, HEIGHT);
//         // console.log(dataArray);
//         for (var i = 0; i < bufferLength; i++) {
//             barHeight = dataArray[i];


//             // var r, g, b;
//             // if (i / bufferLength < 0.13) { // top part (saffron)
//             //     r = 255;
//             //     g = 140;
//             //     b = 0;
//             // } else if (i / bufferLength < 0.26) { // middle part (white)
//             //     r = 255;
//             //     g = 255;
//             //     b = 255;
//             // } else { // bottom part (green)
//             //     r = 0;
//             //     g = 128;
//             //     b = 0;
//             // }


//             // Increase bar height sensitivity and make it more playful
//             // barHeight = barHeight * 1.5 + Math.sin(i * 0.1) * 20; // Example playful effect
//             const sensitivityFactor = 0.5; // Increased sensitivity
//             const baseHeight = barHeight;
//             const frequencyInfluence = Math.sin(i * 0.05) * 30; // Broader frequency influence
//             const randomVariation = Math.random() * 5; // More random variation
//             const barStyleMultiplier = getBarStyle(i, bufferLength); // Apply style multiplier
//             barHeight = (baseHeight + frequencyInfluence) * barStyleMultiplier;
//             // Ensure bar height is within reasonable bounds
//             let r, g, b;
//             const heightRatio = barHeight / HEIGHT;

//             // Transition from red to blue as height increases
//             r = Math.round(40 * (1 - heightRatio)); // Reduced red
//             g = Math.round(200 * heightRatio); // Added some green for a bluish tint
//             b = Math.round(200 * heightRatio + 55); // Increased blue and added a base blue

//             barHeight = Math.max(0, Math.min(barHeight, HEIGHT));

//             // You can further adjust the color range and transitions as desired.

//             ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
//             ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

//             x += barWidth + 1;
//         }
//     }


//     audio.play();
//     renderFrame();

    
// };



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
    var dataArray = new Uint8Array(bufferLength);
    


    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / (bufferLength - 45));
    //if the width is of pc then
    if (WIDTH >= 600) {
        barWidth = (WIDTH / (bufferLength - 58));
    }
    var barHeight;
    var x = 0;

    // Function to calculate mean
    function getMean(arr) {
        if (arr.length === 0) return 0;
        const sum = arr.reduce((acc, val) => acc + val, 0);
        return sum / arr.length;
    }

    // Style switching logic
    let style = 0;
    let styleInterval;

    function updateStyleInterval() {
        if (styleInterval) clearInterval(styleInterval);

        analyser.getByteFrequencyData(dataArray);
        const meanValue = getMean(dataArray);
        const delay = (255 - dataArray[10]) * (3000 / 255);

        console.log("New style switch delay:", delay.toFixed(2), "ms");

        styleInterval = setInterval(() => {
            style = 1 - style;
            updateStyleInterval(); // Keep it dynamic
        }, delay);
    }

    function getBarStyle(i, bufferLength) {
        if (style === 0) {
            if (i < bufferLength * 0.13 || i > bufferLength * 0.13) {
                return dataArray[i] * 0.01;
            }
        } else {
            if (i >= bufferLength * 0 && i <= bufferLength * 0.44) {
                return dataArray[i] * 0.01;
            }
        }
        
        return 0.7;
    }

    function renderFrame() {
        requestAnimationFrame(renderFrame);

        x = 0;

        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        // rev_dataArray = dataArray.reverse();

        for (var i = 30; i < bufferLength-30; i++) {
            barHeight = dataArray[i] + dataArray[bufferLength - 1 - i];
            if(i<30){
                barHeight += dataArray[bufferLength-1-52+i];
            }
            if (i >= 25 && i < 30) barHeight -= 0;
            // console.log(dataArray);

            const sensitivityFactor = 0.5;
            const baseHeight = barHeight;
            const frequencyInfluence = Math.sin(i * 0.05) * 30;
            const randomVariation = Math.random() * 5;
            const barStyleMultiplier = getBarStyle(i, bufferLength);
            barHeight = (baseHeight) ;

            barHeight = Math.max(0, Math.min(barHeight, HEIGHT));

            let r, g, b;
            const heightRatio = barHeight / HEIGHT;

            r = Math.round(40 * (1 - heightRatio));
            g = Math.round(200 * heightRatio);
            b = Math.round(200 * heightRatio + 55);

            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
    }

    audio.play();
    updateStyleInterval();
    renderFrame();
};
