import { calculate, EPSILON } from "./gauss.calc";
const data = [
  {
    matrix: `-1.99 -1.47 -1.05 3.24 4.91
  -0.79 -1.16 -0.80 -1.15 7.87
  -2.91 -2.72 3.85 1.90 5.78
  3.25 0.98 0.50 -3.82 1.00`,
    expectedDeterminant: 49.303799250000004,
    rows: 4,
  },
];

describe(`Testing gauss`, () => {
  for (const { matrix, expectedDeterminant, rows } of data) {
    test(`Matrix`, () => {
      const { msg, m, mReverse, determinant } = calculate(matrix);
      if (!m || !determinant) {
        throw new Error("No matrix");
      }
      expect(m.length).toStrictEqual(rows);
      expect(Math.abs(determinant - expectedDeterminant)).toBeLessThan(EPSILON);
    });
  }
});
