import validatePurchaseMoneyInteger from '../src/validations/validate/PurchaseMoneyValidate.js';
import { PURCHASE_NUMBER_ERROR_MESSAGES, LOTTO_CONDITION } from '../src/constants/constants.js';

test.each([1.5, ''])('정수가 아닌 경우 에러 발생', (input) => {
  expect(() => validatePurchaseMoneyInteger(input)).toThrow(PURCHASE_NUMBER_ERROR_MESSAGES.INTIGER);
});

test.each([-1000, -2000])(`${LOTTO_CONDITION.PRICE}원 미만인 경우 에러 발생`, (input) => {
  expect(() => validatePurchaseMoneyInteger(input)).toThrow(PURCHASE_NUMBER_ERROR_MESSAGES.MIN);
});

test.each([9999, 2500])(`${LOTTO_CONDITION.PRICE}원 단위가 아닌 경우 에러 발생`, (input) => {
  expect(() => validatePurchaseMoneyInteger(input)).toThrow(PURCHASE_NUMBER_ERROR_MESSAGES.UNIT);
});
