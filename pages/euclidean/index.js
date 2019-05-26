"use strict";
/// <reference path="../../node_modules/@types/p5/index.d.ts"/>
/// <reference path="../../node_modules/@types/p5/global.d.ts"/>
exports.__esModule = true;
var radius = 300;
var synth = new Tone.Synth().toMaster();
var rhythmPart;
var centerPoint;
var currentRhythm;
function setup() {
    var context = new AudioContext();
    Tone.Transport.bpm.value = 160;
    createCanvas(windowWidth, windowHeight);
    stroke(0, 0, 0);
    fill(255, 255, 255, 0);
    textSize(32);
    centerPoint = { x: windowWidth / 2, y: windowHeight / 2 };
    ;
}
function draw() {
    clear();
    var n = Math.floor(Math.abs(map(mouseX, 0, width, 1, 16)));
    var k = Math.floor(Math.abs(map(mouseY, 0, height, 1, 16)));
    n = n === 0 ? 1 : n;
    k = k === 0 ? 1 : k;
    if (n === k) {
        k += 1;
    }
    var param = { n: Math.max(n, k), k: Math.min(n, k) };
    // console.log(param);
    currentRhythm = getEuclideanRhythm(param.n, param.k);
    // console.log(currentRhythm);
    drawEuclideanRhythm(param.n, param.k, currentRhythm);
}
function mouseClicked() {
    startMusic(currentRhythm);
}
function startMusic(rhythm) {
    Tone.Transport.stop();
    var data = rhythm.map(function (x, index) {
        var timing = "0:" + index;
        return [timing, x === 1 ? 'A3' : 'A2'];
    });
    if (rhythmPart) {
        rhythmPart.dispose();
    }
    rhythmPart = new Tone.Part(function (time, note) {
        synth.triggerAttackRelease(note, '8n', time);
    }, data).start(0);
    Tone.Transport.start();
}
function drawEuclideanRhythm(n, k, rhythm) {
    drawCircle();
    drawN(n);
    drawK(rhythm, n);
    fill(0);
    var intervals = getIntervalVectors(rhythm);
    var textRowHeight = 30;
    var rowNumber = 0;
    text("\u0395(" + k + ", " + n + ")", 0, textRowHeight * ++rowNumber);
    ++rowNumber;
    text("[" + rhythm + "]", 0, textRowHeight * ++rowNumber);
    text("(" + intervals.join('') + ")", 0, textRowHeight * ++rowNumber);
    text("Euclidean Strings: " + (isEuclideanStrings(intervals) ? 'Yes' : 'No'), 0, textRowHeight * ++rowNumber);
}
function drawCircle() {
    fill(255, 255);
    ellipse(centerPoint.x, centerPoint.y, radius * 2);
}
function drawN(n) {
    fill(255);
    // beginShape();
    var cursor = 0;
    for (var angle = -90; angle < 270; angle += (360 / n)) {
        var vx = centerPoint.x + cos(radians(angle)) * radius;
        var vy = centerPoint.y + sin(radians(angle)) * radius;
        // vertex(vx, vy);
        ellipse(vx, vy, 20);
        fill(100);
        text(cursor.toString(), vx, vy + 25);
        fill(255);
        cursor += 1;
    }
    // endShape(CLOSE);
}
function drawK(rhythm, n) {
    fill(0, 50);
    beginShape();
    var cursor = 0;
    for (var angle = -90; angle <= 270; angle += (360 / n)) {
        if (rhythm[cursor] === 1) {
            var vx = centerPoint.x + cos(radians(angle)) * radius;
            var vy = centerPoint.y + sin(radians(angle)) * radius;
            vertex(vx, vy);
            ellipse(vx, vy, 20);
        }
        cursor += 1;
    }
    endShape(CLOSE);
}
