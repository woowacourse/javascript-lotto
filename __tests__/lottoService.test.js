import lottoService from '../src/lottoService';

describe('등수 계산 테스트', () => {
  test('당첨 번호를 비교한 결과로 1등부터 5등까지 뽑는다.', () => {
    const RANK_RESULT = 2;
    const MATCHED_RESULT = { matchedCount: 5, isBonusMatched: true };

    const result = lottoService.pickLottoRank(MATCHED_RESULT);

    expect(result).toEqual(RANK_RESULT);
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
