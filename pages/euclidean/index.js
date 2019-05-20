/// <reference path="../../types/p5/global.d.ts"/>
/// <reference path="../../types/p5/index.d.ts"/>
var n = 8;
var k = 3;
var e = [1, 0, 0, 1, 0, 0, 1, 0];
var angleStep = 360 / n;
var radius = 300;
var v1;
function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke(0, 0, 0);
    fill(255, 255, 255, 0);
    textSize(32);
    v1 = { x: windowWidth / 2, y: windowHeight / 2 };
    ;
}
function draw() {
    drawCircle();
    drawN(n);
    drawK(e);
}
function drawCircle() {
    ellipse(v1.x, v1.y, radius * 2);
}
function drawN(n) {
    beginShape();
    var cursor = 0;
    for (var angle = -90; angle < 270; angle += angleStep) {
        var vx = v1.x + cos(radians(angle)) * radius;
        var vy = v1.y + sin(radians(angle)) * radius;
        vertex(vx, vy);
        ellipse(vx, vy, 20);
        text(cursor.toString(), vx, vy);
        cursor += 1;
    }
    endShape(CLOSE);
}
function drawK(e) {
    beginShape();
    var cursor = 0;
    for (var angle = -90; angle <= 270; angle += angleStep) {
        if (e[cursor] === 1) {
            var vx = v1.x + cos(radians(angle)) * radius;
            var vy = v1.y + sin(radians(angle)) * radius;
            vertex(vx, vy);
        }
        cursor += 1;
    }
    endShape(CLOSE);
}
