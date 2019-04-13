/// <reference path="./types/p5/global.d.ts"/>
/// <reference path="./types/p5/index.d.ts"/>
var tileSize = 20;
var synth = new Tone.PolySynth(8, Tone.Synth).toMaster();
var midiSynth = new Tone.PolySynth(16, Tone.Synth).toMaster();
var pressed = false;
var layer;
var metronomeLayer;
var startButton;
var endButton;
var data = [];
var isStarted = false;
var frameCountAtStarted = 0;
var notes = [
    'A#5',
    'G#5',
    'F#5',
    'D#5',
    'C#5',
    'A#4',
    'G#4',
    'F#4',
    'D#4',
    'C#4',
    'A#3',
    'G#3',
    'F#3',
    'D#3',
    'C#3',
    'A#2',
    'G#2',
    'F#2',
    'D#2',
    'C#2',
    'A#1',
    'G#1',
    'F#1',
    'D#1',
    'C#1',
];
var canvasWidth;
var canvasHeight;
fetch("magical.json")
    .then(function (response) { return response.json(); })
    .then(function (midiData) {
    for (var i = 0; i < midiData.tracks.length; i++) {
        new Tone.Part(function (time, note) {
            midiSynth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
        }, midiData.tracks[i].notes).start();
    }
});
function setup() {
    var context = new AudioContext();
    canvasWidth = 16 * tileSize;
    canvasHeight = notes.length * tileSize;
    createCanvas(canvasWidth, canvasHeight);
    // layer
    layer = createGraphics(canvasWidth, canvasHeight);
    layer.clear();
    layer.colorMode(HSB, 360, 100, 100, 100);
    metronomeLayer = createGraphics(canvasWidth, canvasHeight);
    metronomeLayer.clear();
    // setup button
    startButton = createButton('start');
    startButton.position(0, 0);
    startButton.mousePressed(_clickedStartButton);
    endButton = createButton('end');
    endButton.position(100, 0);
    endButton.mousePressed(_clickedEndButton);
}
function draw() {
    if (!pressed && mouseIsPressed) {
        // synth.triggerAttackRelease("G#4");
    }
    if (pressed && !mouseIsPressed) {
        // synth.triggerRelease();
    }
    if (mouseIsPressed) {
        pressed = true;
    }
    else {
        pressed = false;
    }
    _drawTile();
    _play();
    image(layer, 0, 0, canvasWidth, canvasHeight);
    image(metronomeLayer, 0, 0, canvasWidth, canvasHeight);
}
function _drawTile() {
    var xPosition = Math.floor(mouseX / tileSize);
    var yPosition = Math.floor(mouseY / tileSize);
    _writeRect(xPosition, yPosition);
    if (mouseIsPressed) {
        if (!data.find(function (e) { return e[0] === xPosition && e[1] === yPosition; })) {
            data.push([xPosition, yPosition]);
        }
    }
}
function _writeRect(x, y) {
    if (mouseIsPressed) {
        layer.noStroke();
        layer.fill(map(mouseY, 0, height, 0, 360), 100, 64, 255);
        layer.rect((x * tileSize), (y * tileSize), tileSize, tileSize);
    }
    else {
        // clear
        background(255);
        noStroke();
        fill(200, 200, 200);
        rect((x * tileSize), (y * tileSize), tileSize, tileSize);
    }
}
function _clickedStartButton() {
    frameCountAtStarted = frameCount;
    isStarted = true;
    // _startMidi();
}
function _clickedEndButton() {
    isStarted = false;
    Tone.Transport.stop();
}
function _play() {
    if (!isStarted) {
        return;
    }
    // frameCount --> 60 = 2 second (frameRate: 30)
    var nowFrameCount = frameCount - frameCountAtStarted;
    var tempo = 60 / 6;
    var beatCount = Math.floor(nowFrameCount / tempo);
    metronomeLayer.clear();
    metronomeLayer.noStroke();
    metronomeLayer.fill(140, 140, 140, 30);
    metronomeLayer.rect(beatCount * tileSize, 0, tileSize, canvasHeight);
    if ((nowFrameCount % tempo) === 0) {
        var attackNotes = data
            .filter(function (x) { return x[0] === beatCount; })
            .map(function (x) { return notes[x[1]]; });
        if (!attackNotes || attackNotes.length === 0) {
            return;
        }
        synth.triggerAttackRelease(attackNotes, '8n');
    }
    if (beatCount * tileSize > canvasWidth) {
        frameCountAtStarted = frameCount;
    }
}
function _startMidi() {
    Tone.Transport.bpm.value = 120;
    Tone.Transport.start();
}
