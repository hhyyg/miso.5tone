type P = {
    a: number[][], b: number[][], r: number
};

/**
 * n > k
 * @param n 
 * @param k 
 */
export function calc(n: number, k: number): number[] {

    if (n < 0 || k < 0 || n <= k) {
        throw Error();
    }
    
    let next:P = {
        a: Array(k).fill(1).map(x => [x]),
        b: Array(n - k).fill(0).map(x => [x]),
        r: Array(n - k).length
    };
    log(next);

    while(next.r !== 1 && next.r !== 0) {
        next = process(next);
    };

    const result = [...Array.prototype.concat(...next.a), ...Array.prototype.concat(...next.b)];
    return result;
}

function process(p: P): P {
    let nextA = p.a
        .slice(0, Math.min(p.a.length, p.b.length))
        .map(x => {
            const result: number[] = [...x, ...p.b[0]];
            return result;
        });
    let nextB = p.b
        .slice(Math.min(p.a.length, p.b.length), p.b.length)
        ;
    if (nextB.length === 0) {
        nextB = p.a
            .slice(Math.min(p.a.length, p.b.length), p.a.length)
            ;
    }

    const nextP = { a: nextA, b:nextB, r: nextB.length };

    log(nextP);
    return nextP;
}

function log(p: P) {
    console.log(`a: ${toString(p.a.map(x => toString(x)))} b: ${toString(p.b.map(x => toString(x)))} r: ${p.r}`);
}

function toString(value: any[]) {
    return `[${value}]`;
}
