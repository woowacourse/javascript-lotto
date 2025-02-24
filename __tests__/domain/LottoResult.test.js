import LottoResult from '../../src/domain/LottoResult.js';

describe('LottoResult 클래스 테스트', () => {
  test('addRankingCount 메서드를 사용하면 등수 카운트가 증가한다', () => {
    const lottoResult = new LottoResult();
    lottoResult.addRankingCount(1);

    expect(lottoResult.result[1]).toBe(1);
  });
});
