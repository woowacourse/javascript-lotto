import LottoRank from '../../src/domain/LottoRank.js';

describe('LottoRank 클래스 테스트', () => {
  test('addRankingCount 메서드를 사용하면 등수 카운트가 증가한다', () => {
    const lottoRank = new LottoRank();
    lottoRank.addRankingCount(1);

    expect(lottoRank.rank[1]).toBe(1);
  });
});
