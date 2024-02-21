/* eslint-disable */
import Lotto from '../src/domain/lotto.js';
import WinningLotto from '../src/domain/winningLotto.js';

describe('로또 당첨 번호 객체 테스트', () => {
  test('보너스 번호가 1이상 45이하가 아니면 에러 발생', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 46;

    expect(() => {
      new WinningLotto(lotto, bonusNumber);
    }).toThrow();
  });

  test('당첨 번호와 보너스가 중복된다면 에러 발생', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 6;

    expect(() => {
      new WinningLotto(lotto, bonusNumber);
    }).toThrow();
  });
});
