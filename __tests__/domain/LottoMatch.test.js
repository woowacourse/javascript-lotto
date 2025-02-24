import Lotto from '../../src/domain/Lotto.js';
import LottoMatch from '../../src/domain/LottoMatch.js';

describe('LottoMatch 클래스 테스트', () => {
  let lottoMatch;

  beforeEach(() => {
    lottoMatch = new LottoMatch(new Lotto([1, 2, 3, 4, 5, 6]), 7); // ✅ 공통 초기화
  });

  test.each([
    [new Lotto([1, 2, 3, 4, 5, 6]), 6],
    [new Lotto([1, 2, 3, 4, 5, 7]), 5],
    [new Lotto([1, 2, 3, 4, 15, 16]), 4],
    [new Lotto([1, 2, 3, 14, 15, 16]), 3],
    [new Lotto([1, 2, 13, 14, 15, 16]), 2],
  ])(`로또 번호가 %o일 때 당첨 개수는 %i이다`, (lotto, expectedMatchCount) => {
    expect(lottoMatch.countMatchingNumbers(lotto)).toBe(expectedMatchCount);
  });

  test('보너스 번호 일치 여부 테스트', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 7]);

    expect(lottoMatch.hasBonusNumber(lotto)).toBe(true);
  });
});
