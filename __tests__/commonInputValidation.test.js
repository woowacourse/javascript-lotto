import commonInputValidation from "../src/validation/commonInputValidation.js";
import startValidation from "../src/validation/startValidation.js";
import ERROR_MESSAGE from "../src/constants/errorMessage.js";

describe("공통 입력 유효성 검사 테스트", () => {
  const executeValidation = (input) => () =>
    startValidation(commonInputValidation.categories, input);
  describe("예외 테스트", () => {
    test.each([
      {
        input: "",
        expectedErrorMessage: ERROR_MESSAGE.notEmpty,
      },
      {
        input: "a ",
        expectedErrorMessage: ERROR_MESSAGE.withoutSpaces,
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
        input: "1000",
      },
      {
        input: "100000",
      },
    ])('입력값이 "$input"일 때 에러가 발생하지 않는다.', ({ input }) => {
      expect(executeValidation(input)).not.toThrow();
    });
  });
});
