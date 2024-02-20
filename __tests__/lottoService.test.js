import LottoService from '../src/LottoService';

describe('등수 계산 테스트', () => {
  test('당첨 번호를 비교한 결과로 1등부터 5등까지 뽑는다.', () => {
    const RANK_RESULT = [0, 0, 1, 0, 0, 0];

    const MATCHED_RESULT = { matchedCount: 5, isBonusMatched: true };
    const lottoService = new LottoService();

    lottoService.pickLottoRank(MATCHED_RESULT);

    expect(lottoService.rankList).toEqual(RANK_RESULT);
  });
});
