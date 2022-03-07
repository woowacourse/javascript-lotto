import Lotto from '../LottoCollection/Lotto.js';

describe('로또 번호가 얼마나 일치하는지 계산할 수 있다.', () => {
  const winningNumbers = [1, 32, 24, 19, 43, 3];
  const bonusNumber = 45;

  test('보너스 번호가 일치하지 않을 때 몇 개가 일치하는지 알 수 있어야 한다.', () => {
    const lotto = new Lotto();

    lotto.numbers = [1, 2, 3, 4, 5, 6];
    expect(lotto.match(new Set(winningNumbers), bonusNumber)).toBe(2);

    lotto.numbers = [32, 24, 19, 7, 8, 2];
    expect(lotto.match(new Set(winningNumbers), bonusNumber)).toBe(3);

    lotto.numbers = [32, 24, 19, 7, 8, 3];
    expect(lotto.match(new Set(winningNumbers), bonusNumber)).toBe(4);

    lotto.numbers = [32, 24, 19, 1, 8, 3];
    expect(lotto.match(new Set(winningNumbers), bonusNumber)).toBe(5);

    lotto.numbers = [32, 24, 19, 1, 43, 3];
    expect(lotto.match(new Set(winningNumbers), bonusNumber)).toBe(6);
  });

  test('보너스 번호가 일치할 때, 몇 개가 일치하는지 알 수 있어야 한다.', () => {
    const lotto = new Lotto();

    lotto.numbers = [45, 24, 19, 1, 43, 3];

    expect(lotto.match(new Set(winningNumbers), bonusNumber)).toBe(7);
  });
});
