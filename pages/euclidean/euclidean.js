"use strict";
exports.__esModule = true;
/**
 * n > k
 * @param n
 * @param k
 */
function getEuclideanRhythm(n, k) {
    var _a, _b;
    if (n <= 0 || k <= 0 || n <= k) {
        throw Error("invalid arguments");
        ;
    }
    var next = {
        a: Array(k).fill(1).map(function (x) { return [x]; }),
        b: Array(n - k).fill(0).map(function (x) { return [x]; }),
        r: -1 // If the remainder is 1, perform processing at least once
    };
    log(next);
    while (next.r !== 1 && next.r !== 0) {
        next = process(next);
    }
    ;
    var result = (_a = Array.prototype).concat.apply(_a, next.a).concat((_b = Array.prototype).concat.apply(_b, next.b));
    return result;
}
exports.getEuclideanRhythm = getEuclideanRhythm;
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
function getIntervalVectors(euclideanRhythm) {
    var results = [];
    var currentCount = 0;
    euclideanRhythm.forEach(function (value, index) {
        if (index !== 0 && value === 1) {
            results.push(currentCount);
            currentCount = 0;
        }
        if (index === (euclideanRhythm.length - 1)) {
            results.push(currentCount + 1);
        }
        currentCount += 1;
    });
    return results;
}
exports.getIntervalVectors = getIntervalVectors;
function isEuclideanStrings(values) {
    if (values.some(function (x) { return x <= 0; })) {
        throw Error("invalid arguments");
    }
    if (values.length === 1) {
        return true;
    }
    var other = values.map(function (value, index) {
        return index === 0 ? value + 1 :
            index === (values.length - 1) ? value - 1 :
                value;
    });
    for (var index = 0; index < (other.length - 1); index++) {
        var rightRotateValues = other.slice(index + 1, other.length).concat(other.slice(0, index + 1));
        if (values.join() === rightRotateValues.join()) {
            return true;
        }
    }
    return false;
}
exports.isEuclideanStrings = isEuclideanStrings;
function getManyPatterns(max) {
    var results = [];
    var format = function (element) { return "\"E(" + element.k + ", " + element.n + ")\",\"[" + element.rhythm + "]\"," + element.intervals.join('') + "," + element.isEuclideanStrings; };
    for (var i = 0; i <= max; i++) {
        for (var j = 0; j <= max; j++) {
            if (i <= 0 || j <= 0 || (i === j) || j < i) {
                console.log('skip');
                continue;
            }
            var rhythm = getEuclideanRhythm(Math.max(i, j), Math.min(i, j));
            var intervals = getIntervalVectors(rhythm);
            results.push({
                n: Math.max(i, j),
                k: Math.min(i, j),
                rhythm: rhythm,
                intervals: intervals,
                isEuclideanStrings: isEuclideanStrings(intervals)
            });
        }
    }
    results.forEach(function (element) {
        console.log(format(element));
    });
    return results;
}
exports.getManyPatterns = getManyPatterns;
