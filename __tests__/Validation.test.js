import { ErrorMessage } from "../src/constants/Constants";
import Validation from "../src/utils/Validation";

describe("Validation 테스트", () => {
  describe("구입 금액 입력값 예외 테스트", () => {
    test("값이 0 이하인 경우 예외 발생", () => {
      const PURCHASE_AMOUNT = [0, -1000, -2000, -1561];

      PURCHASE_AMOUNT.forEach((amount) => {
        expect(() => Validation.checkPurchaseAmount(amount)).toThrow(
          ErrorMessage.MINMUM_VALUE
        );
      });
    });
  });
  
  test("값이 천원 단위가 아닌 경우 예외 발생", () => {
    const PURCHASE_AMOUNT = [100, 2200, 3330, 4444];

    PURCHASE_AMOUNT.forEach((amount) => {
      expect(() => Validation.checkPurchaseAmount(amount)).toThrow(
        ErrorMessage.MONEY_VALUE
      );
    });
  });
});
