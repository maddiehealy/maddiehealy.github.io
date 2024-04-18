var sound = new Howl({
    src: ['audio/takefive.mp3'],
    html5: true 
});

function playSound() {
    sound.play();
}

function pauseSound() {
    sound.pause();
}

function stopSound() {
    sound.stop();
}

function changeVolume() {
    var volume = document.getElementById("volumeSlider").value;
    sound.volume(volume);
}

