import {
  validateRange,
  validateType,
  validateUnit,
} from "../../src/validators/PurchasePriceValidator";

describe("구매 금액 검증 테스트", () => {
  describe("예외 케이스", () => {
    test.each(["^", NaN, undefined, {}])(
      "구매 금액이 숫자가 아니면 에러가 발생한다. (입력 값 : %p)",
      (purchasePrice) => {
        expect(() => validateType(purchasePrice)).toThrow(
          "구매 금액은 숫자여야 합니다."
        );
      }
    );

    test.each([999, 1000001, -Infinity, Infinity])(
      "구매 금액이 1,000원 이상 1,000,000 이하가 아니면 에러가 발생한다. (입력 값 : %p)",
      (purchasePrice) => {
        expect(() => validateRange(purchasePrice)).toThrow(
          "구매 금액은 1,000원 이상 1,000,000원 이하여야 합니다."
        );
      }
    );

    test.each([1001, 1999, 3023, 999999])(
      "구매 금액이 1,000원 단위로 나누어 떨어지지 않으면 에러가 발생한다. (입력 값 : %p)",
      (purchasePrice) => {
        expect(() => validateUnit(purchasePrice)).toThrow(
          "구매 금액은 1,000원 단위로 입력해야 합니다."
        );
      }
    );
  });
});
