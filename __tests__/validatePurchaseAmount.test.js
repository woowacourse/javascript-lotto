import {
  PURCHASE_AMOUNT_ERROR_MESSAGES,
  MIN_UNIT,
  MAX_AMOUNT,
} from "../src/constants/constants.js";
import validatePurchaseAmount from "../src/validations/validatePurchaseAmount.js";

describe("구입 금액 유효성 테스트", () => {
  test.each([
    {
      description: "숫자가 아닌 경우",
      input: "숫자아님",
      expectedErrorMessage: PURCHASE_AMOUNT_ERROR_MESSAGES.NOT_A_NUMBER,
    },
    {
      description: `${MIN_UNIT.toLocaleString()}원 미만인 경우`,
      input: `${MIN_UNIT - 1}`,
      expectedErrorMessage: PURCHASE_AMOUNT_ERROR_MESSAGES.BELOW_MINIMUM,
    },
    {
      description: `${MIN_UNIT.toLocaleString()}원 단위가 아닌 경우`,
      input: `${MIN_UNIT + 1}`,
      expectedErrorMessage: PURCHASE_AMOUNT_ERROR_MESSAGES.INVALID_UNIT,
    },
    {
      description: `${MAX_AMOUNT.toLocaleString()}원을 초과하는 경우`,
      input: `${MAX_AMOUNT * 10}`,
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
