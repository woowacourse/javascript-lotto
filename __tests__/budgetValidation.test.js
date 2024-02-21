import BudgetValidation from "../src/validation/budgetValidation.js";
import startValidation from "../src/validation/startValidation.js";
import ERROR_MESSAGE from "../src/constants/errorMessage.js";

describe("로또 구입 금액 유효성 검사 테스트", () => {
  const executeValidation = (input) => () =>
    startValidation(BudgetValidation.categories, input);
  describe("예외 테스트", () => {
    test.each([
      {
        input: "abc",
        expectedErrorMessage: ERROR_MESSAGE.integerCheck,
      },
      {
        input: 100001,
        expectedErrorMessage: ERROR_MESSAGE.rangeCheck,
      },
      {
        input: 999,
        expectedErrorMessage: ERROR_MESSAGE.rangeCheck,
      },
      {
        input: 1001,
        expectedErrorMessage: ERROR_MESSAGE.minimumCheck,
      },
    ])(
      '입력값이 "$input"일 때 "$expectedErrorMessage" 메시지와 함께 에러가 발생해야 한다.',
      ({ input, expectedErrorMessage }) => {
        expect(executeValidation(input)).toThrow(expectedErrorMessage);
      }
    );
  });

  describe("정상 동작 테스트", () => {
    test.each([
      {
        input: 1000,
      },
      {
        input: 100000,
      },
    ])('입력값이 "$input"일 때 에러가 발생하지 않는다.', ({ input }) => {
      expect(executeValidation(input)).not.toThrow();
    });
  });
});
