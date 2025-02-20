import { MESSAGES } from "../constants/index.js";
import { purchaseAmountValidator } from "../validators/index.js";

describe("PurchaseAmount 테스트", () => {
  test("올바른 구입 금액이면 에러가 발생하지 않는다.", () => {
    expect(() => purchaseAmountValidator(1000)).not.toThrow();
  });

  test("구입 금액이 숫자가 아니면 에러를 띄운다.", () => {
    expect(() => purchaseAmountValidator("abcd")).toThrow(
      MESSAGES.invalid.numberFormat
    );
  });

  test("구입 금액에 소수점이 있으면 에러를 띄운다.", () => {
    expect(() => purchaseAmountValidator(1000.5)).toThrow(
      MESSAGES.invalid.decimalNumber
    );
  });

  test("구입 금액이 1000원으로 나누어 떨어지지 않을 경우 에러를 띄운다.", () => {
    expect(() => purchaseAmountValidator(2025)).toThrow(
      MESSAGES.invalid.purchaseAmount
    );
  });

  test("구입 금액이 1000원 미만이면 에러를 던진다.", () => {
    expect(() => purchaseAmountValidator(999)).toThrow(
      MESSAGES.invalid.minimumPurchase
    );
  });
});
