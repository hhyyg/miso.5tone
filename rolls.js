
const synth = new Tone.Synth().toMaster();

let pressed = false;

function setup() {
    const context = new AudioContext();
}

function draw() {
    if (!pressed && mouseIsPressed) {
        synth.triggerAttackRelease("G#4");
    }

    if (pressed && !mouseIsPressed) {
        synth.triggerRelease();
    }

    if (mouseIsPressed) {
        pressed = true;
        ellipse(50, 50, 50, 50);
    } else {
        pressed = false;
        clear();
    }
}
