import validatePurchaseMoney from '../../src/validations/validate/PurchaseMoneyValidate.js';
import { PURCHASE_NUMBER_ERROR_MESSAGES, LOTTO_CONDITION } from '../../src/constants/constants.js';

describe('구입 금액 유효성 검사 테스트', () => {
  test.each([1.5, ''])('구입 금액이 %s일 때 정수가 아니므로 에러를 발생시킨다', (input) => {
    expect(() => validatePurchaseMoney(input)).toThrow(PURCHASE_NUMBER_ERROR_MESSAGES.INTIGER);
  });

  test.each([-1000, -2000])(
    `구입 금액이 %i원일 때 최소 금액(${LOTTO_CONDITION.PRICE}원)보다 작아서 에러를 발생시킨다`,
    (input) => {
      expect(() => validatePurchaseMoney(input)).toThrow(PURCHASE_NUMBER_ERROR_MESSAGES.MIN);
    },
  );

  test.each([9999, 2500])(
    `구입 금액이 %i원일 때 ${LOTTO_CONDITION.PRICE}원 단위가 아니므로 에러를 발생시킨다`,
    (input) => {
      expect(() => validatePurchaseMoney(input)).toThrow(PURCHASE_NUMBER_ERROR_MESSAGES.UNIT);
    },
  );
});
