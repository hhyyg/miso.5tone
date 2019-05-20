/// <reference path="../../types/p5/global.d.ts"/>
/// <reference path="../../types/p5/index.d.ts"/>

type P = {
    x: number,
    y: number,
}

const n = 8;
const k = 3;
const e = [1, 0, 0, 1, 0, 0, 1, 0];

const angleStep = 360 / n;
const radius = 300;
let v1:P;

function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke(0, 0, 0);
    fill(255, 255, 255, 0);
    textSize(32);

    v1 = { x: windowWidth / 2, y: windowHeight / 2 };;
}

function draw() {
    drawCircle();
    drawN(n);
    drawK(e);
}

function drawCircle() {
    ellipse(v1.x, v1.y, radius * 2);
}

function drawN(n: number) {
    beginShape();

    let cursor = 0;
    for(let angle = -90; angle < 270; angle += angleStep) {
        const vx = v1.x + cos(radians(angle)) * radius;
        const vy = v1.y + sin(radians(angle)) * radius;
        vertex(vx, vy);
        ellipse(vx, vy, 20);

        text(cursor.toString(), vx, vy);
        cursor += 1;
    }

    endShape(CLOSE);
}

function drawK(e: number[]) {
    beginShape();
    let cursor = 0;

    for(let angle = -90; angle <= 270; angle += angleStep) {

        if (e[cursor] === 1) {
            const vx = v1.x + cos(radians(angle)) * radius;
            const vy = v1.y + sin(radians(angle)) * radius;
            vertex(vx, vy);
        }
        cursor += 1;
    }
    endShape(CLOSE);
}