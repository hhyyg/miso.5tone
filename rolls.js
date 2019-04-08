/// <reference path="./types/p5/global.d.ts"/>
/// <reference path="./types/p5/index.d.ts"/>
var tileSize = 20;
var synth = new Tone.Synth().toMaster();
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
function setup() {
    var context = new AudioContext();
    createCanvas(windowWidth, windowHeight);
    // layer
    layer = createGraphics(windowWidth, windowHeight);
    layer.clear();
    layer.colorMode(HSB, 360, 100, 100, 100);
    metronomeLayer = createGraphics(windowWidth, windowHeight);
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
    image(layer, 0, 0, windowWidth, windowHeight);
    image(metronomeLayer, 0, 0, windowWidth, windowHeight);
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
}
function _clickedEndButton() {
    isStarted = false;
}
function _play() {
    if (!isStarted) {
        return;
    }
    // frameCount --> 60 = 1 second
    var nowFrameCount = frameCount - frameCountAtStarted;
    var tempo = 10;
    var beatCount = Math.floor(nowFrameCount / tempo);
    metronomeLayer.clear();
    metronomeLayer.noStroke();
    metronomeLayer.fill(140, 140, 140, 30);
    metronomeLayer.rect(beatCount * tileSize, 0, tileSize, windowHeight);
    if ((nowFrameCount % tempo) === 0) {
        var drawTile = data.find(function (e) { return e[0] === beatCount; });
        if (!drawTile) {
            return;
        }
        var note = notes[drawTile[1]];
        if (!note) {
            return;
        }
        synth.triggerAttackRelease(note, '8n');
    }
}
