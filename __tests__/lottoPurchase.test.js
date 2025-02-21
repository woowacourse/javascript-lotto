import validateLottoPurchase from '../src/Validation/validateLottoPurchase.js';
import ERROR_MESSAGE from '../src/settings/ErrorMessage.js';

it(`로또 구입 금액은 1000원일때 1을 반환해야 한다.`, () => {
  const testCase = 1000;
  expect(validateLottoPurchase(testCase)).toBe(1);
});
it(`로또 구입 최소 금액은 1000원 미만일때 ${ERROR_MESSAGE.notEnoughMoney}에러를 던진다.`, () => {
  const testCase = 999;
  expect(() => {
    validateLottoPurchase(testCase);
  }).toThrow(ERROR_MESSAGE.notEnoughMoney);
});

it(`로또 구입 금액은 1000원 단위가 아닐때 ${ERROR_MESSAGE.notANote}에러를 던진다.`, () => {
  const testCase = 1001;
  expect(() => {
    validateLottoPurchase(testCase);
  }).toThrow(ERROR_MESSAGE.notANote);
});
