import Lotto from '../LottoCollection/Lotto.js';

describe('로또 번호가 얼마나 일치하는지 계산할 수 있다.', () => {
  const winningNumber = [1, 32, 24, 19, 43, 3];
  const bonusNumber = 45;

  test('[1, 2, 3, 4, 5, 6] 일 때, 2개가 일치해야 한다.', () => {
    const lotto = new Lotto();
    const lottoNumber = [1, 2, 3, 4, 5, 6];

    lotto.numbers = lottoNumber;

    expect(lotto.match(new Set(winningNumber), bonusNumber)).toBe(2);
  });

  test('[32, 24, 19, 7, 8, 2] 일 때, 3개가 일치해야 한다.', () => {
    const lotto = new Lotto();
    const lottoNumber = [32, 24, 19, 7, 8, 2];

    lotto.numbers = lottoNumber;

    expect(lotto.match(new Set(winningNumber), bonusNumber)).toBe(3);
  });

  test('[32, 24, 19, 7, 8, 3] 일 때, 4개가 일치해야 한다.', () => {
    const lotto = new Lotto();
    const lottoNumber = [32, 24, 19, 7, 8, 3];

    lotto.numbers = lottoNumber;

    expect(lotto.match(new Set(winningNumber), bonusNumber)).toBe(4);
  });

  test('[32, 24, 19, 1, 8, 3] 일 때, 5개가 일치해야 한다.', () => {
    const lotto = new Lotto();
    const lottoNumber = [32, 24, 19, 1, 8, 3];

    lotto.numbers = lottoNumber;

    expect(lotto.match(new Set(winningNumber), bonusNumber)).toBe(5);
  });

  test('[32, 24, 19, 1, 43, 3] 일 때, 6개가 일치해야 한다.', () => {
    const lotto = new Lotto();
    const lottoNumber = [32, 24, 19, 1, 43, 3];

    lotto.numbers = lottoNumber;

    expect(lotto.match(new Set(winningNumber), bonusNumber)).toBe(6);
  });

  test('[6, 24, 19, 1, 43, 3] 일 때, 5개+보너스볼이란 의미로 7이 리턴되어야 한다.', () => {
    const lotto = new Lotto();
    const lottoNumber = [45, 24, 19, 1, 43, 3];

    lotto.numbers = lottoNumber;

    expect(lotto.match(new Set(winningNumber), bonusNumber)).toBe(7);
  });
});
