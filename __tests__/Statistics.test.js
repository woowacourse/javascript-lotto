import Statistics from '../src/domains/Statistics';

describe('Statistics 기능 테스트', () => {
  describe('여러 장의 티켓의 비교해서 일치 여부에 따른 등수 통계', () => {
    const MATCHING_RESULTS = [
      { isBonus: false, matchedCount: 4 },
      { isBonus: true, matchedCount: 4 },
      { isBonus: false, matchedCount: 5 },
      { isBonus: true, matchedCount: 5 },
      { isBonus: false, matchedCount: 2 },
      { isBonus: false, matchedCount: 1 },
    ];
    const RANKS = { 1: 0, 2: 1, 3: 1, 4: 2, 5: 0 };
    const PAYMENT_AMOUNT = MATCHING_RESULTS.length * 1_000;

    test('빌헹된 로또 티켓들의 당첨번호,보너스 번호와의 일치 여부가 MATCHING_RESULTS일 경우, 등수 통계는 RANKS와 같아야한다.', () => {
      const statistics = new Statistics(MATCHING_RESULTS, PAYMENT_AMOUNT);

      expect(statistics.lottoAnalytics.statisticsResult).toEqual(RANKS);
    });
  });

  describe('구매금액과 당첨 금액을 이용해 총 수익률을 반환한다.', () => {
    const MATCHING_RESULTS = [{ isBonus: false, matchedCount: 4 }];
    const PAYMENT_AMOUNT = 1000;
    const PROFIT_RATE = 5000;

    test(`구매금액이 ${PAYMENT_AMOUNT}이고 일치 개수가 ${MATCHING_RESULTS[0].matchedCount}라면 수익률을 ${PROFIT_RATE}여야 한다.`, () => {
      const statistics = new Statistics(MATCHING_RESULTS, PAYMENT_AMOUNT);

      expect(statistics.lottoAnalytics.profitRate).toBe(PROFIT_RATE);
    });
  });
});
