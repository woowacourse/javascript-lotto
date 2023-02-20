/* eslint-disable max-params */
import LottoRank from '../src/domain/LottoRank';

describe('LottoRank 객체입니다.', () => {
  test.each([
    [0, true, LottoRank.PRIZE.MISS.RANK],
    [0, false, LottoRank.PRIZE.MISS.RANK],
    [1, true, LottoRank.PRIZE.MISS.RANK],
    [1, false, LottoRank.PRIZE.MISS.RANK],
    [2, true, LottoRank.PRIZE.MISS.RANK],
    [2, false, LottoRank.PRIZE.MISS.RANK],
    [3, true, LottoRank.PRIZE.FIFTH.RANK],
    [3, false, LottoRank.PRIZE.FIFTH.RANK],
    [4, true, LottoRank.PRIZE.FOURTH.RANK],
    [4, false, LottoRank.PRIZE.FOURTH.RANK],
    [5, true, LottoRank.PRIZE.SECOND.RANK],
    [5, false, LottoRank.PRIZE.THIRD.RANK],
    [6, false, LottoRank.PRIZE.FIRST.RANK],
  ])('로또 등수를 판별하는 로직', (matchCount, hasBonus, expected) => {
    expect(LottoRank.getWinRank(matchCount, hasBonus)).toEqual(expected);
  });
});
