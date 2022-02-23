import { LOTTO_PRICE, LOTTO_RULE } from '../constants';
import Model from '../model';
import { validateCashInput } from '../utils/validation';

describe('', () => {
  let model;
  beforeEach(() => {
    model = new Model();
  });

  test('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
    const lottoQuantity = 10;
    model.buyLotto(lottoQuantity);
    expect(model.getLottoList().length).toBe(lottoQuantity);
  });

  test(`로또 1개당 ${LOTTO_RULE.NUMBERS_COUNT}개의 번호가 할당된다.`, () => {
    expect(model.makeLottoNumbers().size).toBe(LOTTO_RULE.NUMBERS_COUNT);
  });

  test(`금액이 ${LOTTO_PRICE}원으로 나눠떨어지지 않으면, 에러를 생성한다.`, () => {
    const cash = 1500;
    expect(() => validateCashInput(cash)).toThrow();
  });
});
