import { MIN_UNIT, MAX_AMOUNT } from "../src/constants/validateConstants.js";
import { PURCHASE_AMOUNT_ERROR_MESSAGES } from "../src/constants/errorConstants.js";
import validatePurchaseAmount from "../src/validations/validatePurchaseAmount.js";

describe("구입 금액 유효성 테스트", () => {
  describe("잘못된 입력값 검증", () => {
    test.each([
      {
        description: "숫자가 아닌 경우",
        input: "숫자아님",
        expectedErrorMessage: PURCHASE_AMOUNT_ERROR_MESSAGES.NOT_A_NUMBER,
      },
      {
        description: `${MIN_UNIT.toLocaleString()}원 미만인 경우`,
        input: `${MIN_UNIT - 1}`,
        expectedErrorMessage: PURCHASE_AMOUNT_ERROR_MESSAGES.BELOW_MINIMUM, // 수정됨
      },
      {
        description: `${MAX_AMOUNT.toLocaleString()}원을 초과하는 경우`,
        input: `${MAX_AMOUNT * 10}`,
        expectedErrorMessage: PURCHASE_AMOUNT_ERROR_MESSAGES.ABOVE_MAXIMUM,
      },
      {
        description: `${MIN_UNIT.toLocaleString()}원 단위가 아닌 경우`,
        input: `${MIN_UNIT + 1}`,
        expectedErrorMessage: PURCHASE_AMOUNT_ERROR_MESSAGES.INVALID_UNIT,
      },
    ])(
      "구입 금액이 $description 에러가 발생한다.",
      ({ input, expectedErrorMessage }) => {
        expect(() => {
          validatePurchaseAmount(input);
        }).toThrow(expectedErrorMessage);
      }
    );
  });

  describe("정상적인 입력값 검증", () => {
    test.each([
      {
        description: `${MIN_UNIT.toLocaleString()}원 이상인 경우`,
        input: `${MIN_UNIT}`,
      },
      {
        description: `${MIN_UNIT.toLocaleString()}원 단위인 경우`,
        input: MIN_UNIT * 3, // 수정됨
      },
      {
        description: `${MAX_AMOUNT.toLocaleString()}원 이하인 경우`,
        input: `${MAX_AMOUNT}`,
      },
    ])("구입 금액이 $description 정상적으로 통과해야한다.", ({ input }) => {
      expect(() => {
        validatePurchaseAmount(input);
      }).not.toThrow();
    });
  });
});
