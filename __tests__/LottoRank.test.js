/* eslint-disable max-params */
import LottoRank from '../src/domain/LottoRank';

describe('LottoRank 객체입니다.', () => {
  const winRankByMatchCount = (matchCount, hasBonus, expected) => {
    expect(LottoRank.getWinRank(matchCount, hasBonus)).toEqual(expected);
  };

  test.each([
    [0, true, LottoRank.PRIZE.MISS.RANK],
    [0, false, LottoRank.PRIZE.MISS.RANK],
    [1, true, LottoRank.PRIZE.MISS.RANK],
    [1, false, LottoRank.PRIZE.MISS.RANK],
    [2, true, LottoRank.PRIZE.MISS.RANK],
    [2, false, LottoRank.PRIZE.MISS.RANK],
  ])('로또등수가 낙첨인지 판단', winRankByMatchCount);

  test.each([
    [3, true, LottoRank.PRIZE.FIFTH.RANK],
    [3, false, LottoRank.PRIZE.FIFTH.RANK],
  ])('로또 등수가 5등인지 판단(3개 일치)', winRankByMatchCount);

  test.each([
    [4, true, LottoRank.PRIZE.FOURTH.RANK],
    [4, false, LottoRank.PRIZE.FOURTH.RANK],
  ])('로또 등수가 4등인지 판단(4개 일치)', winRankByMatchCount);

  test.each([[5, false, LottoRank.PRIZE.THIRD.RANK]])(
    '로또 등수가 3등인지 판단(5개 일치)',
    winRankByMatchCount,
  );

  test.each([[5, true, LottoRank.PRIZE.SECOND.RANK]])(
    '로또 등수가 2등인지 판단(5개 일치 + 보너스볼 일치)',
    winRankByMatchCount,
  );

  test.each([[6, false, LottoRank.PRIZE.FIRST.RANK]])(
    '로또 등수가 1등인지 판단(6개 일치)',
    winRankByMatchCount,
  );
});
