/// <reference path="../../types/p5/global.d.ts"/>
/// <reference path="../../types/p5/index.d.ts"/>
var n = 8;
var k = 3;
var e = [1, 0, 0, 1, 0, 0, 1, 0];
var radius = 300;
var v1;
function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke(0, 0, 0);
    v1 = { x: windowWidth / 2, y: windowHeight / 2 };
    ;
}
function draw() {
    drawCircle();
    drawN(n);
}
function drawCircle() {
    ellipse(v1.x, v1.y, radius * 2);
}
function drawN(n) {
    var angleStep = 360 / n;
    beginShape();
    for (var angle = 0; angle <= 360; angle += angleStep) {
        var vx = v1.x + cos(radians(angle)) * radius;
        var vy = v1.y + sin(radians(angle)) * radius;
        vertex(vx, vy);
    }
    endShape();
}
function drawK() {
    // next
}
