/* eslint-disable no-undef */
import LottoSimulator from '../src/controller/LottoSimulator';
import { ERROR_MESSAGE, LOTTO_CONSTANT } from '../src/data/constants';

test.each([[1000], [2000], [3000], [4000]])('구입 금액에 대한 전체 성공 case', (budget) => {
  const lottoSimulator = new LottoSimulator();
  const errorMessage = [
    ERROR_MESSAGE.NOT_INTEGER(LOTTO_CONSTANT.BUDGET),
    ERROR_MESSAGE.BUDGET_NOT_DIVISIBLE_BY_LOTTO_PRICE,
    ERROR_MESSAGE.BUDGET_LESS_THAN_LOTTO_PRICE,
  ];

  errorMessage.forEach((message) => {
    expect(() => {
      lottoSimulator.validateBudget(budget);
    }).not.toThrow(message);
  });
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

test.each([['y'], ['n']])('재시작 커맨드에 대한 성공 case', (command) => {
  const lottoSimulator = new LottoSimulator();
  expect(() => {
    lottoSimulator.validateRetryCommand(command);
  }).not.toThrow(ERROR_MESSAGE.RETRY_COMMAND);
});

test.each([['h'], [' ']])('재시작 커맨드는 y 또는 n이다.', (command) => {
  const lottoSimulator = new LottoSimulator();
  expect(() => {
    lottoSimulator.validateRetryCommand(command);
  }).toThrow(ERROR_MESSAGE.RETRY_COMMAND);
});
