/* eslint-disable no-undef */
import { ERROR_MESSAGE } from '../src/data/constants';
import Lotto from '../src/domain/Lotto';
import WinningLotto from '../src/domain/WinningLotto';

test.each([['a'], ['가'], ['!'], [' ']])('보너스 번호는 숫자이다', (bonusNumber) => {
  expect(() => {
    const numbers = [1, 2, 3, 4, 5, 6];
    new WinningLotto(numbers, bonusNumber);
  }).toThrow();
});

test.each([[0], [46], [-3]])('보너스 번호는 1~45 사이의 수이다', (bonusNumber) => {
  expect(() => {
    const numbers = [1, 2, 3, 4, 5, 6];
    new WinningLotto(numbers, bonusNumber);
  }).toThrow();
});

test.each([[1], [2], [3]])('보너스 번호는 중복될 수 없다', (bonusNumber) => {
  expect(() => {
    const numbers = [1, 2, 3, 4, 5, 6];
    new WinningLotto(numbers, bonusNumber);
  }).toThrow();
});

describe('일치된 번호에 해당하는 순위를 계산한다', () => {
  const numbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;
  const winningLotto = new WinningLotto(numbers, bonusNumber);

  test('2등 일치 계산', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 7]);
    expect(winningLotto.calculateRanking(lotto)).toBe('second');
  });

  test('4등 일치 계산', () => {
    const lotto = new Lotto([1, 2, 3, 4, 9, 10]);
    expect(winningLotto.calculateRanking(lotto)).toBe('fourth');
  });
});
