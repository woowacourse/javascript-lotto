import { LOTTO_SETTING } from '../constants/setting';
import { ERROR_MESSAGE } from '../constants/string';

import { isPositiveInteger, isDivisible } from '../utils/validator';
import { checkValidMoneyInput } from '../utils/Lotto/validator';

it('로또 구매 금액은 입력란이 빈칸일 수 없다.', () => {
  const userInput = '';

  expect(isPositiveInteger(userInput)).toBe(false);
});

it('로또 구매 금액은 숫자만 입력할 수 있다.', () => {
  const userInput = '천원';

  expect(isPositiveInteger(userInput)).toBe(false);
});

it('로또 구매 금액은 천원 단위로 입력할 수 있다.', () => {
  const userMoneyInput = 1100;
  const priceUnit = LOTTO_SETTING.PRICE;

  expect(isDivisible(userMoneyInput, priceUnit)).toBe(false);
});

it('로또 구매 금액을 정상적으로 입력할 수 있다.', () => {
  // 정상 값 시도
  let userInput = 2000;
  expect(checkValidMoneyInput(userInput)).toBe(undefined);

  // -- 이후 비정상 값 시도
  // 천원 단위가 아닐 때
  userInput = 1100;
  expect(() => {
    checkValidMoneyInput(userInput);
  }).toThrow(ERROR_MESSAGE.WRONG_LOTTO_PRICE_UNIT_INPUT);

  // 숫자가 아닐 때
  userInput = '일억원';
  expect(() => {
    checkValidMoneyInput(userInput);
  }).toThrow(ERROR_MESSAGE.NOT_POSITIVE_NUMBER_INPUT);
});
