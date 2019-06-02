import { getEuclideanRhythm, getIntervalVectors, isEuclideanStrings, getManyPatterns} from "./euclidean";

test('calc', () => {
    expect(getEuclideanRhythm(13, 5)).toStrictEqual([1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0]);
    expect(getEuclideanRhythm(7, 3)).toStrictEqual([1, 0, 1, 0, 1, 0, 0]);
    expect(getEuclideanRhythm(8, 3)).toStrictEqual([1, 0, 0, 1, 0, 0, 1, 0]);

    expect(getEuclideanRhythm(7, 4)).toStrictEqual([1, 0, 1, 0, 1, 0, 1]);

    expect(getEuclideanRhythm(4, 1)).toStrictEqual([1, 0, 0, 0]);
    expect(getEuclideanRhythm(3, 1)).toStrictEqual([1, 0, 0]);
    expect(getEuclideanRhythm(6, 2)).toStrictEqual([1, 0, 0, 1, 0, 0]);

    // n = k + 1
    expect(getEuclideanRhythm(2, 1)).toStrictEqual([1, 0]);
    expect(getEuclideanRhythm(3, 2)).toStrictEqual([1, 0, 1]);
    expect(getEuclideanRhythm(4, 3)).toStrictEqual([1, 0, 1, 1]);
    expect(getEuclideanRhythm(5, 4)).toStrictEqual([1, 0, 1, 1, 1]);
    expect(getEuclideanRhythm(7, 6)).toStrictEqual([1, 0, 1, 1, 1, 1, 1]);
});

test('getIntervalVectors', () => {
    expect(getIntervalVectors(getEuclideanRhythm(9, 4))).toStrictEqual([2, 2, 2, 3]);
    expect(getIntervalVectors(getEuclideanRhythm(12, 7))).toStrictEqual([2, 1, 2, 2, 1, 2, 2]);
    expect(getIntervalVectors(getEuclideanRhythm(3, 1))).toStrictEqual([3]);
});

test('isEuclideanStrings', () => {

    expect(isEuclideanStrings([1])).toBe(true);
    expect(isEuclideanStrings([100])).toBe(true);
    expect(isEuclideanStrings([7])).toBe(true);
    expect(isEuclideanStrings([8])).toBe(true);

    expect(isEuclideanStrings([2, 3])).toBe(true);
    expect(isEuclideanStrings([2, 3, 3])).toBe(true);
    expect(isEuclideanStrings([2, 3, 3, 3, 3, 3])).toBe(true);
    expect(isEuclideanStrings([2, 2, 3])).toBe(true);
    expect(isEuclideanStrings([2, 2, 2, 3])).toBe(true);
    expect(isEuclideanStrings([2, 2, 2, 2, 3])).toBe(true);
    expect(isEuclideanStrings([3, 3, 3, 3, 4])).toBe(true);

    expect(isEuclideanStrings([1, 8, 10])).toBe(false);
    expect(isEuclideanStrings([2, 1, 2, 1, 2])).toBe(false);
    expect(isEuclideanStrings([2, 1, 2, 2, 1, 2, 2])).toBe(false);
    expect(isEuclideanStrings([2, 1, 2, 2, 2, 1, 2, 2, 2])).toBe(false);
    expect(isEuclideanStrings([2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2])).toBe(false);

    // need confirm
    expect(isEuclideanStrings([3, 3])).toBe(false);
    expect(isEuclideanStrings([4, 4])).toBe(false);
    expect(isEuclideanStrings([19, 19])).toBe(false);
});

// test('isEuclideanStrings', () => {
//     getManyPatterns(30);
// });
