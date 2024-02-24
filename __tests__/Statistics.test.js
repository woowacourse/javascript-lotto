import { Statistics } from '../src/domains';

describe('Statistics 기능 테스트', () => {
  // given
  const MATCHING_RESULTS = [
    { isBonus: false, matchedCount: 4 },
    { isBonus: true, matchedCount: 4 },
    { isBonus: false, matchedCount: 5 },
    { isBonus: true, matchedCount: 5 },
    { isBonus: false, matchedCount: 2 },
    { isBonus: false, matchedCount: 1 },
    { isBonus: false, matchedCount: 0 },
  ];
  const PAYMENT_AMOUNT = MATCHING_RESULTS.length * 1_000;

  test('statisticsResult - 등수 별 티켓 개수를 반환한다.', () => {
    // given
    const STATISTICS_RESULT = { 1: 0, 2: 1, 3: 1, 4: 2, 5: 0 };

    // when
    const statistics = new Statistics(MATCHING_RESULTS, PAYMENT_AMOUNT);

    // then
    expect(statistics.statisticsResult).toEqual(STATISTICS_RESULT);
  });

  test('totalPrizes - 총 상금을 반환한다.', () => {
    // given
    const TOTAL_PRIZES = 31_600_000;

    // when
    const statistics = new Statistics(MATCHING_RESULTS, PAYMENT_AMOUNT);

    // then
    expect(statistics.totalPrizes).toBe(TOTAL_PRIZES);
  });

  test('profitRate - 총 수익률을 반환한다.', () => {
    // given
    const PROFIT_RATE = 451428.6;

    // when
    const statistics = new Statistics(MATCHING_RESULTS, PAYMENT_AMOUNT);

    // then
    expect(statistics.profitRate).toBe(PROFIT_RATE);
  });
});
