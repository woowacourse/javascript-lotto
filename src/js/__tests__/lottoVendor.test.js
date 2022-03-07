import EXCEPTION from '../constants/exception';
import LottoVendor from '../model/LottoVendor';

describe('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
  test('입력받는 구입 금액은 1,000원 이상이어야 한다.', () => {
    // given
    const lottoVendor = new LottoVendor();
    const delimiter = 1000;

    // when
    function setMoney(money) {
      lottoVendor.paidMoney = money;
    }

    // then
    expect(() => setMoney(delimiter)).not.toThrowError(EXCEPTION.INVALID_RANGE.MINIMUM);
  });

  test('사용자가 입력한 금액만큼 로또가 구매된다.', () => {
    // given
    const lottoCount = 5;
    const lottoVendor = new LottoVendor();
    lottoVendor.paidMoney = 5000;

    // when
    lottoVendor.createLottos();

    // then
    expect(lottoVendor.lottos.length).toBe(lottoCount);
  });
});
