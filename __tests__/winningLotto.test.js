import Lotto from '../src/domain/lotto.js';
import WinningLotto from '../src/domain/winningLotto.js';
import { LOTTO_RULES } from '../src/constant/index.js';

describe('로또 당첨 번호 객체 테스트', () => {
  test(`보너스 번호가 ${LOTTO_RULES.min_number}이상 ${LOTTO_RULES.max_number}이하가 아니면 에러가 발생한다`, () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 46;

    expect(() => {
      new WinningLotto(lotto, bonusNumber);
    }).toThrow();
  });

  test('당첨 번호와 보너스가 중복된다면 에러가 발생한다', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 6;

    expect(() => {
      new WinningLotto(lotto, bonusNumber);
    }).toThrow();
  });

  test('일치 개수와 보너스 숫자 포함 여부 반환 테스트', () => {
    const numbers = [1, 2, 3, 11, 12, 7];
    const winningLotto = new WinningLotto(new Lotto([1, 2, 3, 4, 5, 6]), 7);
    const result = { correct: 3, hasBonusNumber: true };

    expect(winningLotto.calculateWinner(numbers)).toEqual(result);
  });
});
