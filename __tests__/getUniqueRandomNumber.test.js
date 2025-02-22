import { getUniqueRandomNumbers } from '../src/util/getUniqueRandomNumbers.js';

describe('랜덤 숫자를 받아오는 함수 테스트', () => {
  describe('인자로 최솟값이 1, 최댓값이 45로 주어졌을 때', () => {
    it('함수에서 반환되는 값이 1에서 45 사이의 범위여야 한다.', () => {
      const numberRange = { min: 1, max: 45, count: 6 };
      const sets = getUniqueRandomNumbers(numberRange);

      sets.forEach((number) => {
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(45);
      });
    });

    it('랜덤 함수 호출 시 6개를 가져오면 반환되는 값이 6개 여야한다.', () => {
      const numberRange = { min: 1, max: 45, count: 6 };
      const sets = getUniqueRandomNumbers(numberRange);

      expect(sets.length).toBe(6);
    });
  });
});
