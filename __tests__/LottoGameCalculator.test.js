import LottoGameCalculator from '../src/domain/LottoGameCalculator.js';
import { LOTTO_PRIZE } from '../src/constant/constants.js';

describe('등수 계산', () => {
  test.each([
    [1, true, LOTTO_PRIZE.rankNone],
    [3, false, LOTTO_PRIZE.rank5],
    [4, false, LOTTO_PRIZE.rank4],
    [5, false, LOTTO_PRIZE.rank3],
    [5, true, LOTTO_PRIZE.rank2],
    [6, false, LOTTO_PRIZE.rank1],
  ])('맞은 개수:%s, 보너스 여부:%s 는 %s를 반환한다', (intersectCount, hasBonus, rank) => {
    expect(LottoGameCalculator.convertCountToRank(intersectCount, hasBonus)).toBe(rank);
  });
});

describe('거스름돈 계산', () => {
  test('구입 금액 8700인 경우 거스름돈은 700원', () => {
    expect(LottoGameCalculator.getTheChange(8700)).toBe(700);
  });

  test('구입 금액 8000인 경우 거스름돈은 0원', () => {
    expect(LottoGameCalculator.getTheChange(8000)).toBe(0);
  });
});

describe('수익률 계산', () => {
  test('수익률 0%', () => {
    expect(LottoGameCalculator.getEarningRate(
      {
        first: 0,
        second: 0,
        third: 0,
        fourth: 0,
        fifth: 0,
      },
      10_000,
    )).toBe(0);
  });

  test('수익률이 소수점인 경우(40.54%)', () => {
    expect(LottoGameCalculator.getEarningRate(
      {
        first: 0,
        second: 0,
        third: 0,
        fourth: 0,
        fifth: 3,
      },
      37_000,
    )).toBeCloseTo(40.54, 2);
  });

  test('모든 등수 1회씩 당첨', () => {
    expect(LottoGameCalculator.getEarningRate(
      {
        first: 1,
        second: 1,
        third: 1,
        fourth: 1,
        fifth: 1,
      },
      10_000,
    )).toBe(20315550);
  });
});
