import Validation from '../src/domain/Vaildation.js';
import { LOTTO_CONDITION } from '../src/constants/condition.js';

test.each(['abc', '8천원', '8$'])(
  '구입금액 입력이 숫자가 아닌 경우 false를 반환한다.',
  (purchaseAmount) => {
    const result = Validation.isNumber(purchaseAmount);

    expect(result).toBe(false);
  }
);

test('구입금액 입력이 숫자인 경우 true를 반환한다.', () => {
  const purchaseAmount = '1000';

  const result = Validation.isNumber(purchaseAmount);

  expect(result).toBe(true);
});

test(`구입금액 입력이 로또 1장 가격(${LOTTO_CONDITION.lottoPrice}원) 미만인 경우, false를 반환한다.`, () => {
  const purchaseAmount = `${LOTTO_CONDITION.lottoPrice - 1}`;

  const result = Validation.isHigherThanLottoPrice(purchaseAmount);

  expect(result).toBe(false);
});

test(`구입금액 입력이 로또 1장 가격(${LOTTO_CONDITION.lottoPrice}원) 이상인 경우, true를 반환한다.`, () => {
  const purchaseAmount = `${LOTTO_CONDITION.lottoPrice + 1}`;

  const result = Validation.isHigherThanLottoPrice(purchaseAmount);

  expect(result).toBe(true);
});
