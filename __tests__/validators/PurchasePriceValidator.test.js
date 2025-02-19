import { validateRange, validateType } from "../../src/validators/validate";
import {
  PurchasePriceValidator,
  validateUnit,
} from "../../src/validators/PurchasePriceValidator";

describe("구입 금액 검증 테스트", () => {
  describe("정상 케이스", () => {
    test("구입 금액은 숫자여야 하고, 1,000원 단위이며, 1,000 ~ 1,000,000 사이에 있어야 한다.", () => {
      const lottoPurchasePrice = 10000;

      expect(() =>
        PurchasePriceValidator.validate(lottoPurchasePrice)
      ).not.toThrow();
    });
  });

  describe("예외 케이스", () => {
    test.each(["^", NaN, undefined, {}])(
      "구입 금액이 숫자가 아니면 에러가 발생한다. (입력 값 : %p)",
      (purchasePrice) => {
        expect(() => validateType("구입 금액", purchasePrice)).toThrow(
          "구입 금액은(는) 숫자여야 합니다."
        );
      }
    );

    test.each([999, 1000001, -Infinity, Infinity])(
      "구입 금액이 1,000원 이상 1,000,000 이하가 아니면 에러가 발생한다. (입력 값 : %p)",
      (purchasePrice) => {
        expect(() =>
          validateRange({
            key: "구입 금액",
            value: purchasePrice,
            min: 1000,
            max: 1000000,
          })
        ).toThrow("구입 금액은(는) 1,000 이상 1,000,000 이하여야 합니다.");
      }
    );

    test.each([1001, 1999, 3023, 999999])(
      "구입 금액이 1,000원 단위로 나누어 떨어지지 않으면 에러가 발생한다. (입력 값 : %p)",
      (purchasePrice) => {
        expect(() => validateUnit(purchasePrice)).toThrow(
          "구입 금액은 1,000원 단위로 입력해야 합니다."
        );
      }
    );
  });
});
