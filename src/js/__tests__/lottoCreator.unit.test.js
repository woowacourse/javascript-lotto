import LottoCreator from '../model/lottoCreator.js';

describe('lottoCreator 클래스 내부 메서드(로또 구매) 테스트', () => {
  test('구입한 로또 금액만큼 로또가 구매되어야 한다.', () => {
    const lottoCreator = new LottoCreator();
    const lottoCount = 4;

    lottoCreator.createLottoList(lottoCount);

    const lottoResult = lottoCreator.lottoList;
    const isCorrectLottoLength = lottoResult.every((result) => result.size === 6);

    expect(lottoResult).toHaveLength(lottoCount);
    expect(isCorrectLottoLength).toBe(true);
  });
});
