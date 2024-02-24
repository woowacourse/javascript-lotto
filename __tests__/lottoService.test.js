import lottoService from '../src/domain/services/lottoService';

describe('등수 계산 테스트', () => {
  describe('당첨 번호를 비교한 결과로 1등부터 5등까지 뽑는다.', () => {
    const testcases = [
      { rank: 2, matchedResult: { matchedCount: 5, isBonusMatched: true } },
      { rank: 1, matchedResult: { matchedCount: 6, isBonusMatched: false } },
      { rank: 4, matchedResult: { matchedCount: 4, isBonusMatched: true } },
    ];

    test.each(testcases)('$rank 등이 뽑히는 경우', ({ rank, matchedResult }) => {
      const result = lottoService.pickLottoRank(matchedResult);

      expect(result).toEqual(rank);
    });
  });

  test('로또 당첨 금액의 수익률을 계산한다.', () => {
    const MATCHED_RESULT_LIST = [
      { matchedCount: 3, isBonusMatched: false },
      { matchedCount: 2, isBonusMatched: false },
      { matchedCount: 2, isBonusMatched: false },
      { matchedCount: 2, isBonusMatched: false },
      { matchedCount: 1, isBonusMatched: false },
      { matchedCount: 1, isBonusMatched: false },
      { matchedCount: 1, isBonusMatched: false },
      { matchedCount: 0, isBonusMatched: false },
    ];
    const PURCHASE_AMOUNT = 8000;
    const RESULT_PROFIT = '62.5';

    const result = lottoService.calculateProfit(MATCHED_RESULT_LIST, PURCHASE_AMOUNT);

    expect(result).toEqual(RESULT_PROFIT);
  });
});
