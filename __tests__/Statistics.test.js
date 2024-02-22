import Statistics from '../src/domains/Statistics';

describe('Statistics 기능 테스트', () => {
  test('여러 장의 티켓의 비교 결과', () => {
    const RESULTS = [
      { isBonus: false, matchedCount: 4 },
      { isBonus: true, matchedCount: 4 },
      { isBonus: false, matchedCount: 5 },
      { isBonus: true, matchedCount: 5 },
      { isBonus: false, matchedCount: 2 },
      { isBonus: false, matchedCount: 1 },
    ];
    const RANKS = { 1: 0, 2: 1, 3: 1, 4: 2, 5: 0 };
    const PAYMENT_AMOUNT = RESULTS.length * 1_000;

    const statistics = new Statistics(PAYMENT_AMOUNT);
    statistics.matchResultsToRank(RESULTS);

    expect(statistics.statisticsResult).toEqual(RANKS);
  });

  test('총 수익률을 반환한다.', () => {
    const RESULTS = [{ isBonus: false, matchedCount: 4 }];
    const PAYMENT_AMOUNT = 1000;
    const PROFIT_RATE = 5000;

    const statistics = new Statistics();
    statistics.matchResultsToRank(RESULTS);
    statistics.calculateProfitRate(PAYMENT_AMOUNT);

    expect(statistics.profitRate).toBe(PROFIT_RATE);
  });
});
