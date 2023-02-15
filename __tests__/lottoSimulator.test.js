/* eslint-disable no-undef */
import LottoSimulator from '../src/controller/LottoSimulator';
import { ERROR_MESSAGE, LOTTO_STRING } from '../src/data/constants';
test('로또 가격에 맞게 구매하기 ', () => {
  const lottoSimulator = new LottoSimulator();
  lottoSimulator.purchaseLottos(8000);

  expect(lottoSimulator.lottos.length === 8);
});

test.each([['a'], ['가'], ['!'], [' ']])('구입 금액은 숫자이다', (budget) => {
  const lottoSimulator = new LottoSimulator();
  expect(() => {
    lottoSimulator.purchaseLottos(budget);
  }).toThrow(ERROR_MESSAGE.NOT_INTEGER(LOTTO_STRING.BUDGET));
});

test.each([[300], [1], [8008]])(
  '구입 금액은 1000원으로 나뉘어 떨어진다.',
  (budget) => {
    const lottoSimulator = new LottoSimulator();
    expect(() => {
      lottoSimulator.purchaseLottos(budget);
    }).toThrow(ERROR_MESSAGE.BUDGET_NOT_DIVISIBLE_BY_LOTTO_PRICE);
  }
);

test.each([[-1000], [-2000], [-8000]])(
  '구입 금액은 로또 금액보다 크다.',
  (budget) => {
    const lottoSimulator = new LottoSimulator();
    expect(() => {
      lottoSimulator.purchaseLottos(budget);
    }).toThrow(ERROR_MESSAGE.BUDGET_LESS_THAN_LOTTO_PRICE);
  }
);
