import LottoCreator from '../model/lottoCreator.js';

describe('lottoCreator 클래스 내부 메서드(로또 구매) 테스트', () => {
  test('구입한 로또 금액만큼 로또가 구매되어야 한다.', () => {
    const lottoCreator = new LottoCreator();
    lottoCreator.purchaseMoney = 4000;

    lottoCreator.createLottoList();

    const lottoResult = lottoCreator.lottoList;
    const isCorrectLottoLength = lottoResult.every((result) => result.length === 6);

    expect(lottoResult).toHaveLength(4);
    expect(isCorrectLottoLength).toBe(true);
  });
});
