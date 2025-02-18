import { validateRange, validateType } from "../../src/validators/PurchasePriceValidator";

describe("구매 금액 검증 테스트", () => {
  describe("예외 케이스", () => {
    test("구매 금액이 숫자가 아니면 에러가 발생한다.", () => {
      const purchasePrice = "1000";
      expect(() => validateType(purchasePrice)).toThrow(
        "구매 금액은 숫자여야 합니다."
      );
    });

    test("구매 금액이 1000원 이상이 아니면 에러가 발생한다.", () => {
      const purchasePrice = 999;
      expect(() => validateRange(purchasePrice)).toThrow(
        "구매 금액은 1,000원 이상이어야 합니다."
      );
    });
  });
});
