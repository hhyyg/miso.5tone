/// <reference path="../../types/p5/global.d.ts"/>
/// <reference path="../../types/p5/index.d.ts"/>

type P = {
    x: number,
    y: number,
}

const radius = 300;
const synth = new Tone.PolySynth(8, Tone.Synth).toMaster();
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
    currentRhythm = calc(param.n, param.k);
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

    text(`Ε(${n}, ${k})`, centerPoint.x, centerPoint.y);
    text(`[${rhythm}]`, centerPoint.x, centerPoint.y + 30);
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

        text(cursor.toString(), vx, vy);
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