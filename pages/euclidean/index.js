/// <reference path="../../types/p5/global.d.ts"/>
/// <reference path="../../types/p5/index.d.ts"/>
var radius = 300;
var centerPoint;
function setup() {
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
    drawEuclideanRhythm(param.n, param.k);
}
function drawEuclideanRhythm(n, k) {
    console.log({ n: n, k: k });
    var rhythm = calc(n, k);
    console.log(rhythm);
    drawCircle();
    drawN(n);
    drawK(rhythm, n);
    fill(0);
    text("\u0395(" + n + ", " + k + ")", centerPoint.x, centerPoint.y);
    text("[" + rhythm + "]", centerPoint.x, centerPoint.y + 30);
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
        text(cursor.toString(), vx, vy);
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
