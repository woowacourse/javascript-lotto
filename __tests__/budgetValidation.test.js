import budgetValidation from "../src/validation/budgetValidation.js";
import startValidation from "../src/validation/startValidation.js";
import ERROR_MESSAGE from "../src/constants/errorMessage.js";

describe("로또 구입 금액 유효성 검사 테스트", () => {
  const executeValidation = (input) => () =>
    startValidation(budgetValidation.categories, input);

  test.each([
    [
      {
        input: "abc",
      },
      ERROR_MESSAGE.INTEGER_ONLY,
    ],
    [
      {
        input: 100001,
      },
      ERROR_MESSAGE.BUDGET_RANGE,
    ],
    [
      {
        input: 999,
      },
      ERROR_MESSAGE.BUDGET_RANGE,
    ],
    [
      {
        input: 1001,
      },
      ERROR_MESSAGE.DIVISIBLE_BY_MIN_PRICE,
    ],
  ])(
    '입력값이 %o 일 때 "%s" 메시지와 함께 에러가 발생해야 한다.',
    ({ input }, expectedErrorMessage) => {
      expect(executeValidation(input)).toThrow(expectedErrorMessage);
    }
  );
});
