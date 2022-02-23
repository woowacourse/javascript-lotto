import Lotto from '../domains/Lotto.js';
import { LOTTO } from '../constants/constants.js';

function isInRange(arr, min, max) {
  return arr.every((item) => item >= min && item <= max);
}

function isDuplicated(arr) {
  const set = new Set(arr);
  return set.size === arr.length;
}

describe('로또 단위 테스트 ', () => {
  const lotto = new Lotto();
  lotto.numbers = lotto.pickNumbers(lotto.generateRandomNumber);

  test('로또는 1부터 45번까지의 숫자들을 가진다.', () => {
    expect(isInRange(lotto.numbers, LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER)).toBe(
      true
    );
  });

  test('로또는 총 6개의 숫자를 가진다.', () => {
    expect(lotto.numbers).toHaveLength(6);
  });

  test('로또의 각 숫자들은 중복되지 않는다.', () => {
    expect(isDuplicated(lotto.numbers)).toBe(true);
  });
});
