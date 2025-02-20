import LottoResult from "../../src/domain/LottoResult.js";

test('로또 등수 테스트', () => {
    const lottoResult = new LottoResult();
    lottoResult.addRankingCount(1)

    expect(lottoResult.result[1]).toBe(1);
  });
