import { ERROR_MESSAGES, AMOUNT } from "../utils/constants.js";
import { validatePurchaseAmount } from "../utils/validation.js";
import { isValidMinimumAmount, isValidAmountUnit } from "../utils/general.js";

/* eslint-disable no-undef */
describe("구입할 금액 유효성 테스트", () => {
  test("1000원 이상 이어야 한다.", () => {
    const amount = 1000;
    expect(!isValidMinimumAmount(amount)).toBeTruthy();
  });

  test("1000원 미만으로 입력할 수 없다.", () => {
    const amount = 999;
    expect(() =>
      validatePurchaseAmount(amount, AMOUNT.MINIMUM).toThrow(
        ERROR_MESSAGES.MINIMUM_AMOUNT_IS_SMALL,
      ),
    );
  });

  test("1000원 단위로 입력 가능하다.", () => {
    const amount = 2000;
    expect(!isValidAmountUnit(amount, AMOUNT.UNIT)).toBeTruthy();
  });

  test("1000원 단위가 아니면 입력할 수 없다.", () => {
    const amount = 2200;
    expect(() => validatePurchaseAmount(amount)).toThrow(ERROR_MESSAGES.NOT_DIVIDED_INTO_THOUSAND);
  });
});
