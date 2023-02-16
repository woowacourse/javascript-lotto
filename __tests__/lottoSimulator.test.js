/* eslint-disable no-undef */
import LottoSimulator from '../src/controller/LottoSimulator';
import { ERROR_MESSAGE, LOTTO_CONSTANT } from '../src/data/constants';

test('로또 가격에 맞게 구매하기 ', () => {
  const lottoSimulator = new LottoSimulator();
  lottoSimulator.purchaseLottos(8000);

  expect(lottoSimulator.getLottoCount() === 8);
});

test.each([['a'], ['가'], ['!'], [' ']])('구입 금액은 숫자이다', (budget) => {
  const lottoSimulator = new LottoSimulator();
  expect(() => {
    lottoSimulator.validateBudget(budget);
  }).toThrow(ERROR_MESSAGE.NOT_INTEGER(LOTTO_CONSTANT.BUDGET));
});

test.each([[300], [1], [8008]])('구입 금액은 1000원으로 나뉘어 떨어진다.', (budget) => {
  const lottoSimulator = new LottoSimulator();
  expect(() => {
    lottoSimulator.validateBudget(budget);
  }).toThrow(ERROR_MESSAGE.BUDGET_NOT_DIVISIBLE_BY_LOTTO_PRICE);
});

test.each([[-1000], [-2000], [-8000]])('구입 금액은 로또 금액보다 크다.', (budget) => {
  const lottoSimulator = new LottoSimulator();
  expect(() => {
    lottoSimulator.validateBudget(budget);
  }).toThrow(ERROR_MESSAGE.BUDGET_LESS_THAN_LOTTO_PRICE);
});

test.each([['h'], [' ']])('재시작 커맨드는 y 또는 n이다.', (command) => {
  const lottoSimulator = new LottoSimulator();
  expect(() => {
    lottoSimulator.validateRetryCommand(command);
  }).toThrow(ERROR_MESSAGE.RETRY_COMMAND);
});
