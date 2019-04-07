/// <reference path="./types/p5/global.d.ts"/>
/// <reference path="./types/p5/index.d.ts"/>
/// <reference path="./tone.js"/>

const tileSize = 20;
const synth = new Tone.Synth().toMaster();

let pressed = false;

let layer;

function setup() {
    const context = new AudioContext();
    createCanvas(windowWidth, windowHeight);
    layer = createGraphics(windowWidth, windowHeight);
    layer.clear();
    layer.colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
    /*
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
    }
    */

    _drawTile();
}

function _drawTile() {
    const xPosition = Math.floor(mouseX / tileSize);
    const yPosition = Math.floor(mouseY / tileSize);

    _writeRect(xPosition, yPosition);
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

    image(layer, 0, 0, windowWidth, windowHeight);
}
