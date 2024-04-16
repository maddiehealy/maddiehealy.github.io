var sound = new Howl({
    src: ['PUT MY LINK HERE'],
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