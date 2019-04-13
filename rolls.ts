/// <reference path="./types/p5/global.d.ts"/>
/// <reference path="./types/p5/index.d.ts"/>

const tileSize = 20;
const synth = new Tone.PolySynth(8, Tone.Synth).toMaster();
const midiSynth = new Tone.PolySynth(16, Tone.Synth).toMaster();

let pressed = false;

let layer;
let metronomeLayer;

let startButton;
let endButton;

let data: number[][] = [];
let isStarted = false;
let frameCountAtStarted = 0;

const notes = [
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
let canvasWidth;
let canvasHeight;

fetch("magical.json")
    .then(response => response.json())
    .then(midiData => {
        for (var i = 0; i < midiData.tracks.length; i++) {
            new Tone.Part((time, note) => {
                midiSynth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
            }, midiData.tracks[i].notes).start();
        }
    });

function setup() {
    const context = new AudioContext();

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
    } else {
        pressed = false;
    }

    _drawTile();
    _play();


    image(layer, 0, 0, canvasWidth, canvasHeight);
    image(metronomeLayer, 0, 0, canvasWidth, canvasHeight);
}

function _drawTile() {
    const xPosition = Math.floor(mouseX / tileSize);
    const yPosition = Math.floor(mouseY / tileSize);

    _writeRect(xPosition, yPosition);

    if (mouseIsPressed) {
        if (!data.find(e => e[0] === xPosition && e[1] === yPosition)) {
            data.push([xPosition, yPosition]);
        }
    }

}

function _writeRect(x, y) {

    if (mouseIsPressed) {
        layer.noStroke();
        layer.fill(map(mouseY, 0, height, 0, 360), 100, 64, 255);
        
        layer.rect(
            (x * tileSize), 
            (y * tileSize),
            tileSize,
            tileSize
            );

    } else {
        // clear
        background(255);

        noStroke();
        fill(200, 200, 200);
        rect(
            (x * tileSize), 
            (y * tileSize),
            tileSize,
            tileSize
            );
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
    const nowFrameCount = frameCount - frameCountAtStarted;
    const tempo = 60 / 6;

    const beatCount = Math.floor(nowFrameCount / tempo); 
    metronomeLayer.clear();
    metronomeLayer.noStroke();
    metronomeLayer.fill(140, 140, 140, 30);
    metronomeLayer.rect(beatCount * tileSize, 0, tileSize, canvasHeight);

    if ((nowFrameCount % tempo) === 0) {
        const attackNotes = data
            .filter(x => x[0] === beatCount)
            .map(x => notes[x[1]]);
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