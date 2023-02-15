/* eslint-disable no-undef */
import LottoSimulator from '../src/controller/LottoSimulator';
import { ERROR_MESSAGE, LOTTO_CONSTANT } from '../src/data/constants';
import { RandomNumberGenerator } from '../src/utils/RandomNumberGenerator';
import WinningLotto from '../src/domain/WinningLotto';

const mockRandoms = (numbers) => {
  RandomNumberGenerator.generateNumberInRange = jest.fn();
  numbers.reduce(
    (acc, number) => acc.mockReturnValueOnce(number),
    RandomNumberGenerator.generateNumberInRange
  );
};

test('로또 가격에 맞게 구매하기 ', () => {
  const lottoSimulator = new LottoSimulator();
  lottoSimulator.purchaseLottos(8000);

  expect(lottoSimulator.getLottoCount() === 8);
});

test.each([['a'], ['가'], ['!'], [' ']])('구입 금액은 숫자이다', (budget) => {
  const lottoSimulator = new LottoSimulator();
  expect(() => {
    lottoSimulator.purchaseLottos(budget);
  }).toThrow(ERROR_MESSAGE.NOT_INTEGER(LOTTO_CONSTANT.BUDGET));
});

test.each([[300], [1], [8008]])('구입 금액은 1000원으로 나뉘어 떨어진다.', (budget) => {
  const lottoSimulator = new LottoSimulator();
  expect(() => {
    lottoSimulator.purchaseLottos(budget);
  }).toThrow(ERROR_MESSAGE.BUDGET_NOT_DIVISIBLE_BY_LOTTO_PRICE);
});

test.each([[-1000], [-2000], [-8000]])('구입 금액은 로또 금액보다 크다.', (budget) => {
  const lottoSimulator = new LottoSimulator();
  expect(() => {
    lottoSimulator.purchaseLottos(budget);
  }).toThrow(ERROR_MESSAGE.BUDGET_LESS_THAN_LOTTO_PRICE);
});

test('랜덤 로또 번호 생성', () => {
  mockRandoms([1, 5, 10, 15, 20, 45]);
  const lottoSimulator = new LottoSimulator();
  const numbers = lottoSimulator.createLottoNumbers();
  expect(numbers).toEqual([1, 5, 10, 15, 20, 45]);
});

test('로또 결과 계산', () => {
  const lottoSimulator = new LottoSimulator();
  lottoSimulator.winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);
  mockRandoms([8, 21, 23, 41, 42, 43, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 7]);
  lottoSimulator.purchaseLottos(3000);
  expect(lottoSimulator.calculateResult()).toEqual({
    first: 1,
    second: 1,
    third: 0,
    fourth: 0,
    fifth: 0,
    fail: 1,
  });
});
