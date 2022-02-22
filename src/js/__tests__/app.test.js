import { LOTTO_RULE } from '../constants';
import Model from '../model';

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

  test('로또 1개당 6개의 번호가 할당된다.', () => {
    expect(model.makeLottoNumbers().size).toBe(LOTTO_RULE.NUMBERS_COUNT);
  });
});
