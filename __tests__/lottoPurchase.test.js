import validateLottoPurchase from '../src/Validation/validateLottoPurchase.js';
import ERROR_MESSAGE from '../src/settings/ErrorMessage.js';

it(`로또 구입 최소 금액은 1000원 미만일때 에러를 던진다.`, () => {
  const testCase = 900;
  expect(() => {
    validateLottoPurchase(testCase);
  }).toThrow(ERROR_MESSAGE.notEnoughMoney);
});
it('로또 구입 금액은 1000원 단위가 아닐때 에러를 던진다.', () => {
  const testCase = 1001;
  expect(() => {
    validateLottoPurchase(testCase);
  }).toThrow(ERROR_MESSAGE.notANote);
});
