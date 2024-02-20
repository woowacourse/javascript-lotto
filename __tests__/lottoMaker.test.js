import LottoMaker from '../src/LottoMaker';

describe('로또 발행 테스트', () => {
  test('구입 금액에 해당하는 만큼 로또를 발행한다.', () => {
    const PURCHASE_AMOUNT = 2000;
    const LOTTERY_AMOUNT = 2;

    const lottoMaker = new LottoMaker(PURCHASE_AMOUNT);
    const lottoNumberList = lottoMaker.run();

    expect(lottoNumberList.length).toEqual(LOTTERY_AMOUNT);
  });
});
