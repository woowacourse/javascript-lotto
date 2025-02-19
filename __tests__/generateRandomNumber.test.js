import { getUniqueRandomNumbers } from '../src/util/getUniqueRandomNumbers.js';

describe('랜덤 숫자를 받아오는 함수 테스트', () => {
  it('랜덤 함수 호출 시 반환되는 값이 1에서 45 사이의 범위이다.', () => {
    const numberRange = { min: 1, max: 45 };
    const sets = getUniqueRandomNumbers(numberRange, 6);

    sets.forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(1);
      expect(number).toBeLessThanOrEqual(45);
    });
  });
});
