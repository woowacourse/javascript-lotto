import Lotto from '../src/domain/Lotto.js';
import LottoMatch from '../src/domain/LottoMatch.js';

describe('LottoMatch 클래스 테스트', () => {
  test.each([
    [new Lotto([1, 2, 3, 4, 5, 6]), 6],
    [new Lotto([1, 2, 3, 4, 5, 7]), 5],
    [new Lotto([1, 2, 3, 4, 15, 16]), 4],
    [new Lotto([1, 2, 3, 14, 15, 16]), 3],
    [new Lotto([1, 2, 13, 14, 15, 16]), 2],
  ])(`등수가 일치한지 판별`, (lotto, expectedMatchCount) => {
    const lottoMatch = new LottoMatch([1, 2, 3, 4, 5, 6], 7);

    expect(lottoMatch.winningNumbers(lotto)).toBe(expectedMatchCount);
  });

  test('보너스 번호 일치 여부 테스트', () => {
    const lottoMatch = new LottoMatch([1, 2, 3, 4, 5, 6], 7);
    const lotto = new Lotto([1, 2, 3, 4, 5, 7]);

    expect(lottoMatch.BonusNumber(lotto)).toBe(true);
  });
});
