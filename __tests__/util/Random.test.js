import Random from '../../src/util/Random.js';

describe('Random 단위테스트', () => {
  test.each([
    [1, 10],
    [10, 20],
    [20, 30]
  ])('randomPickNumber는 min과 max 사이의 랜덤 정수를 반환한다.', (min, max) => {
    const number = Random.randomPickNumber(min, max);
    expect(number).toBeGreaterThanOrEqual(min);
    expect(number).toBeLessThanOrEqual(max);
  });

  test.each([
    [1, 10, 3],
    [10, 20, 5],
    [20, 30, 7]
  ])(
    'pickCombination은 count 개수 만큼의 중복되지 않는 랜덤 숫자를 가진 배열을 반환한다.',
    (min, max, count) => {
      const combination = Random.pickCombination(min, max, count);
      expect(combination.length).toBe(count);
      expect(new Set(combination).size).toBe(count);
    }
  );
});
