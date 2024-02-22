import winningLottoValidation from "../src/validation/winningLottoValidation.js";
import startValidation from "../src/validation/startValidation.js";
import ERROR_MESSAGE from "../src/constants/errorMessage.js";

describe("로또 당첨 번호와 보너스 번호 유효성 검사 테스트", () => {
  const executeValidation = (input) => () => startValidation(winningLottoValidation.winningCombination, input);

  describe("예외 테스트", () => {
    test.each([
      {
        input: 0,
        expectedErrorMessage: ERROR_MESSAGE.outOfRange,
      },
      {
        input: 46,
        expectedErrorMessage: ERROR_MESSAGE.outOfRange,
      },
    ])(
      '입력값이 "$input"일 때 "$expectedErrorMessage" 메시지와 함께 에러가 발생해야 한다.',
      ({ input, expectedErrorMessage }) => {
        expect(executeValidation(input)).toThrow(expectedErrorMessage);
      },
    );
  });

  describe("정상 동작 테스트", () => {
    test.each([
      {
        input: 1,
      },
      {
        input: 45,
      },
    ])('입력값이 "$input"일 때 에러가 발생하지 않는다.', ({ input }) => {
      expect(executeValidation(input)).not.toThrow();
    });
  });
});
