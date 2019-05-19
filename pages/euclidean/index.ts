/// <reference path="../../types/p5/global.d.ts"/>
/// <reference path="../../types/p5/index.d.ts"/>

type P = {
    x: number,
    y: number,
}

const n = 8;
const k = 3;
const e = [1, 0, 0, 1, 0, 0, 1, 0];
const radius = 300;
let v1:P;

function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke(0, 0, 0);

    v1 = { x: windowWidth / 2, y: windowHeight / 2 };;
}

function draw() {
    drawCircle();
    drawN(n);
}

function drawCircle() {
    ellipse(v1.x, v1.y, radius * 2);
}

function drawN(n: number) {
    const angleStep = 360 / n;

    beginShape();

    for(let angle = 0; angle <= 360; angle += angleStep) {
        const vx = v1.x + cos(radians(angle)) * radius;
        const vy = v1.y + sin(radians(angle)) * radius;
        vertex(vx, vy);
    }

    endShape();
}

function drawK() {
    // next
}