import { PURCHASE_AMOUNT_ERROR_MESSAGES } from "../src/constants/constants.js";
import validatePurchaseAmount from "../src/validations/validatePurchaseAmount.js";

describe("구입 금액 유효성 테스트", () => {
  test.each([
    {
      description: "숫자가 아닌 경우",
      input: "숫자아님",
      expectedErrorMessage: PURCHASE_AMOUNT_ERROR_MESSAGES.NOT_A_NUMBER,
    },
    {
      description: "1,000원 미만인 경우",
      input: "999",
      expectedErrorMessage: PURCHASE_AMOUNT_ERROR_MESSAGES.BELOW_MINIMUM,
    },
    {
      description: "1,000원 단위가 아닌 경우",
      input: "1001",
      expectedErrorMessage: PURCHASE_AMOUNT_ERROR_MESSAGES.INVALID_UNIT,
    },
    {
      description: "100,000원을 초과하는 경우",
      input: "1000000000",
      expectedErrorMessage: PURCHASE_AMOUNT_ERROR_MESSAGES.ABOVE_MAXIMUM,
    },
  ])(
    "구입 금액이 $description 에러가 발생한다.",
    ({ input, expectedErrorMessage }) => {
      // given
      // when & then
      expect(() => {
        validatePurchaseAmount(input);
      }).toThrow(expectedErrorMessage);
    },
  );
});
