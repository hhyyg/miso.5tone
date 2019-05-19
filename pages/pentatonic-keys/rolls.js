/// <reference path="../../types/p5/global.d.ts"/>
/// <reference path="../../types/p5/index.d.ts"/>
var tileSize = 20;
var midiTicks = 480;
var beatsPerMeasure = 4;
var synth = new Tone.PolySynth(8, Tone.Synth).toMaster();
var midiSynth = new Tone.PolySynth(16, Tone.Synth).toMaster();
var drawMelodyPart;
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
    canvasWidth = windowHeight;
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
    Tone.Transport.bpm.value = 170;
    _drawMeasureLine();
}
function draw() {
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
function _drawMeasureLine() {
    var measureCount = Math.floor(canvasWidth / tileSize / beatsPerMeasure);
    for (var index = 0; index < measureCount; index++) {
        var x = (index * tileSize * beatsPerMeasure);
        layer.line(x, 0, x, canvasHeight);
    }
}
function _drawTile() {
    var xPosition = Math.floor(mouseX / tileSize);
    var yPosition = Math.floor(mouseY / tileSize);
    _writeRect(xPosition, yPosition);
    if (xPosition < 0 || yPosition < 0) {
        return;
    }
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
    _setupDrawMelody();
    Tone.Transport.start();
}
function _clickedEndButton() {
    isStarted = false;
    Tone.Transport.stop();
}
function _play() {
    if (!isStarted) {
        return;
    }
    var currentTicks = Tone.Transport.ticks;
    var beatCount = Math.floor(currentTicks / Tone.Transport.PPQ);
    metronomeLayer.clear();
    metronomeLayer.noStroke();
    metronomeLayer.fill(140, 140, 140, 30);
    metronomeLayer.rect((beatCount) * tileSize, 0, tileSize, canvasHeight);
    if (beatCount * tileSize > canvasWidth) {
        frameCountAtStarted = frameCount;
    }
}
function _setupDrawMelody() {
    if (!data || data.length === 0) {
        return;
    }
    var drawMelody = data
        .map(function (x) {
        var attackNote = notes[x[1]];
        if (!attackNote) {
            return null;
        }
        var measure = x[0] === 0 ? 0 : (Math.floor(x[0] / beatsPerMeasure));
        if (measure < 0) {
            return null;
        }
        var beat = x[0] - (measure * beatsPerMeasure);
        var timing = measure + ":" + beat; // 1i == 1tick == 192PPQ;
        return [timing, attackNote];
    })
        .filter(function (x) { return x !== null; });
    if (drawMelodyPart) {
        drawMelodyPart.dispose();
    }
    drawMelodyPart = new Tone.Part(function (time, note) {
        synth.triggerAttackRelease(note, '8n', time);
    }, drawMelody).start(0);
}
