/// <reference path="../../node_modules/@types/p5/index.d.ts"/>
/// <reference path="../../node_modules/@types/p5/global.d.ts"/>

type P = {
    x: number,
    y: number,
}

declare var Tone: any;
export {};

const radius = 300;
const synth = new Tone.Synth().toMaster(); 
let rhythmPart;
let centerPoint:P;
let currentRhythm: number[];

function setup() {
    const context = new AudioContext();
    Tone.Transport.bpm.value = 160;
    createCanvas(windowWidth, windowHeight);
    stroke(0, 0, 0);
    fill(255, 255, 255, 0);
    textSize(32);

    centerPoint = { x: windowWidth / 2, y: windowHeight / 2 };;
}

function draw() {
    clear();

    let n = Math.floor(Math.abs(map(mouseX, 0, width, 1, 16)));
    let k = Math.floor(Math.abs(map(mouseY, 0, height, 1, 16)));

    n = n === 0 ? 1 : n;
    k = k === 0 ? 1 : k;

    if (n === k) {
        k += 1; 
    }

    const param = { n: Math.max(n, k), k: Math.min(n, k) };
    // console.log(param);
    currentRhythm = getEuclideanRhythm(param.n, param.k);
    // console.log(currentRhythm);
    drawEuclideanRhythm(param.n, param.k, currentRhythm);
}

function mouseClicked() {
    startMusic(currentRhythm);
}

function startMusic(rhythm: number[]) {
    Tone.Transport.stop();

    const data = rhythm.map((x, index) => {
        const timing = `0:${index}`;
        return [timing, x === 1 ? 'A3': 'A2'];
    });

    if (rhythmPart) {
        rhythmPart.dispose();
    }
    rhythmPart = new Tone.Part((time, note) => {
        synth.triggerAttackRelease(note, '8n', time);
    }, data).start(0);
    Tone.Transport.start();
}

function drawEuclideanRhythm(n: number, k: number, rhythm: number[]) {

    drawCircle();
    drawN(n);
    drawK(rhythm, n);

    fill(0);

    const intervals = getIntervalVectors(rhythm);
    const textRowHeight = 30;
    let rowNumber = 0;
    text(`Ε(${k}, ${n})`, 0, textRowHeight * ++rowNumber);
    ++rowNumber;
    text(`[${rhythm}]`, 0, textRowHeight * ++rowNumber);
    text(`(${intervals.join('')})`, 0, textRowHeight * ++rowNumber);
    text(`Euclidean strings: ${isEuclideanStrings(intervals) ? 'Yes': 'No'}`, 0, textRowHeight * ++rowNumber);
    text(`reverse Euclidean strings: ${isEuclideanStrings(intervals.slice().reverse()) ? 'Yes': 'No'}`, 0, textRowHeight * ++rowNumber);
}

function drawCircle() {
    fill(255, 255);
    ellipse(centerPoint.x, centerPoint.y, radius * 2);
}

function drawN(n: number) {
    fill(255);
    // beginShape();

    let cursor = 0;
    for(let angle = -90; angle < 270; angle += (360 / n)) {
        const vx = centerPoint.x + cos(radians(angle)) * radius;
        const vy = centerPoint.y + sin(radians(angle)) * radius;
        // vertex(vx, vy);
        ellipse(vx, vy, 20);

        fill(100);
        text(cursor.toString(), vx, vy + 25);
        fill(255);
        cursor += 1;
    }

    // endShape(CLOSE);
}

function drawK(rhythm: number[], n: number) {
    fill(0, 50);
    beginShape();
    let cursor = 0;

    for(let angle = -90; angle <= 270; angle += (360 / n)) {

        if (rhythm[cursor] === 1) {
            const vx = centerPoint.x + cos(radians(angle)) * radius;
            const vy = centerPoint.y + sin(radians(angle)) * radius;
            vertex(vx, vy);

            ellipse(vx, vy, 20);
        }
        cursor += 1;
    }
    endShape(CLOSE);
}