"use strict";
exports.__esModule = true;
/**
 * n > k
 * @param n
 * @param k
 */
function calc(n, k) {
    var _a, _b;
    if (n <= 0 || k <= 0 || n <= k) {
        throw Error();
    }
    var next = {
        a: Array(k).fill(1).map(function (x) { return [x]; }),
        b: Array(n - k).fill(0).map(function (x) { return [x]; }),
        r: Array(n - k).length
    };
    log(next);
    while (next.r !== 1 && next.r !== 0) {
        next = process(next);
    }
    ;
    var result = (_a = Array.prototype).concat.apply(_a, next.a).concat((_b = Array.prototype).concat.apply(_b, next.b));
    return result;
}
exports.calc = calc;
function process(p) {
    var nextA = p.a
        .slice(0, Math.min(p.a.length, p.b.length))
        .map(function (x) {
        var result = x.concat(p.b[0]);
        return result;
    });
    var nextB = p.b
        .slice(Math.min(p.a.length, p.b.length), p.b.length);
    if (nextB.length === 0) {
        nextB = p.a
            .slice(Math.min(p.a.length, p.b.length), p.a.length);
    }
    var nextP = { a: nextA, b: nextB, r: nextB.length };
    log(nextP);
    return nextP;
}
function log(p) {
    console.log("a: " + toString(p.a.map(function (x) { return toString(x); })) + " b: " + toString(p.b.map(function (x) { return toString(x); })) + " r: " + p.r);
}
function toString(value) {
    return "[" + value + "]";
}
