import { calc } from "./euclidean";

test('calc', () => {
    expect(calc(13, 5)).toStrictEqual([1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0]);
    expect(calc(7, 3)).toStrictEqual([1, 0, 1, 0, 1, 0, 0]);
    expect(calc(8, 3)).toStrictEqual([1, 0, 0, 1, 0, 0, 1, 0]);

    expect(calc(3, 2)).toStrictEqual([1, 1, 0]);
    expect(calc(7, 4)).toStrictEqual([1, 0, 1, 0, 1, 0, 1]);
    expect(calc(7, 6)).toStrictEqual([1, 1, 1, 1, 1, 1, 0]);

    expect(calc(4, 1)).toStrictEqual([1, 0, 0, 0]);
    expect(calc(3, 1)).toStrictEqual([1, 0, 0]);
    expect(calc(6, 2)).toStrictEqual([1, 0, 0, 1, 0, 0]);
});