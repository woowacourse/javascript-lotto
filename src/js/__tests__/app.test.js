import { LOTTO_PRICE, LOTTO_RULE } from '../constants';
import Model from '../model';
import { makeLottoNumbers } from '../utils/common';
import { validateCashInput } from '../utils/validation';

describe('로또 구매 테스트', () => {
  test('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
    const model = new Model();
    const lottoQuantity = 10;
    model.buyLotto(lottoQuantity);
    expect(model.getLottoList().length).toBe(lottoQuantity);
  });

  test(`로또 1개당 ${LOTTO_RULE.NUMBERS_COUNT}개의 번호가 할당된다.`, () => {
    expect(makeLottoNumbers().size).toBe(LOTTO_RULE.NUMBERS_COUNT);
  });

  test(`로또 번호는 ${LOTTO_RULE.MIN_NUMBER} 부터 ${LOTTO_RULE.MAX_NUMBER} 사이의 숫자로 이루어져있다.`, () => {
    const lottoNumbers = makeLottoNumbers();
    const temp = [...lottoNumbers.values()].every(
      number => number >= LOTTO_RULE.MIN_NUMBER && number <= LOTTO_RULE.MAX_NUMBER,
    );
    expect(temp).toBeTruthy();
  });

  test(`금액이 ${LOTTO_PRICE}원으로 나눠떨어지지 않으면, 에러를 생성한다.`, () => {
    const cash = 1500;
    expect(() => validateCashInput(cash)).toThrow();
  });
});
