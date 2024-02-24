import LottoMachine from '../src/Domain/LottoMachine';
import LOTTO_SETTING from '../src/Constants/lottoSetting';

describe('로또를 생성해주고 결과를 반환해주는 로또 머신 클래스에 대한 테스트', () => {
  test.each([[7000], [8000]])('구입금액에 해당하는 만큼 로또를 발행한다.', (validInput) => {
    // arrange
    const lottoMachine = new LottoMachine(validInput);

    const totalLottoLength = lottoMachine.getLottos().length;

    expect(totalLottoLength).toBe(validInput / LOTTO_SETTING.MIN_PRICE);
  });

  test.each([0, -1000, 999])('1000원 미만인 경우, (%i 인 경우) 에러를 던진다.', (money) => {
    expect(() => new LottoMachine(money)).toThrow();
  });
});
