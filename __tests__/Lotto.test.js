import Lotto from '../src/domain/Lotto.js';

test('getMatchCount메서드 실행 시 일치하는 번호의 갯수를 반환한다.', () => {
  const lottoNumbers = [1, 2, 3, 4, 5, 6];
  const lotto = new Lotto(lottoNumbers);

  const winningNumbers = [1, 2, 3, 4, 5, 6];

  const matchCount = lotto.getMatchCount(winningNumbers);

  const expected = 6;

  expect(matchCount).toBe(expected);
});

describe('lotto.hasBonusNumber 메서드', () => {
  test('hasBonusNumber메서드는 로또 번호 베열에 보너스 번호가 포함되어 있으면, true를 반환한다.', () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(lottoNumbers);

    const bonusNumber = 1;
    const hasBonusNumber = lotto.hasBonusNumber(bonusNumber);

    expect(hasBonusNumber).toBe(true);
  });

  test('hasBonusNumber메서드는 로또 번호 베열에 보너스 번호가 포함되어 있지 않으면, false를 반환한다.', () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(lottoNumbers);

    const bonusNumber = 7;
    const hasBonusNumber = lotto.hasBonusNumber(bonusNumber);

    expect(hasBonusNumber).toBe(false);
  });
});

test('getCompareResult', () => {
  const lottoNumbers = [1, 2, 3, 4, 5, 6];
  const lotto = new Lotto(lottoNumbers);

  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;
  const compareResult = lotto.getCompareResult(winningNumbers, bonusNumber);

  const expected = { matchCount: 6, hasBonusNumber: false };

  expect(compareResult).toEqual(expected);
});
