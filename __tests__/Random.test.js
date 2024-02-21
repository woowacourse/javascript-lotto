/* eslint-disable max-lines-per-function */
import Random from '../src/util/random/Random.js';

describe('랜덤 테스트', () => {
  test('특정 범위 내에서 랜덤 값 1개를 반환한다.', () => {
    const min = 1;
    const max = 10;
    const testCount = 10;

    const testSuites = Array(testCount)
      .fill()
      .map(() => Random.randomPickNumber(min, max));

    expect(
      testSuites.every((testSuite) => min <= testSuite && testSuite <= max)
    ).toBe(true);
  });

  test('특정 범위 내에서 중복되지 않은 조합을 반환한다.', () => {
    const min = 1;
    const max = 45;
    const count = 6;
    const testCount = 5;

    const testSuites = Array(testCount)
      .fill()
      .map(() => Random.pickCombination(min, max, count));

    expect(
      testSuites.every((testSuite) => {
        return (
          testSuite.length === new Set(testSuite).size &&
          testSuite.length === count
        );
      })
    ).toBe(true);
  });
});
