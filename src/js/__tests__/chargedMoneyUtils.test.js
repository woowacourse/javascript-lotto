import { isPositiveInteger, isDivisible } from '../utils/validator';
import { LOTTO_SETTING } from '../constants/setting';

it('로또 구매 금액은 입력란이 빈칸일 수 없다.', () => {
  const userInput = '';

  expect(isPositiveInteger(userInput)).toBe(false);
});

it('로또 구매 금액은 숫자만 입력할 수 있다.', () => {
  const userInput = '천원';

  expect(isPositiveInteger(userInput)).toBe(false);
});

it('로또 구매 금액은 천원 단위로 입력할 수 있다.', () => {
  const userInput = 1100;

  expect(isDivisible(userInput, LOTTO_SETTING.PRICE)).toBe(false);
});

it('로또 구매 금액을 입력할 수 있다.', () => {
  const userInput = 2000;

  expect(isPositiveInteger(userInput)).toBe(true);
  expect(isDivisible(userInput, LOTTO_SETTING.PRICE)).toBe(true);
});
