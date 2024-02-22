import winningLottoNumbersValidation from "../src/validation/winningLottoNumbersValidation.js";
import startValidation from "../src/validation/startValidation.js";
import ERROR_MESSAGE from "../src/constants/errorMessage.js";

describe("로또 당첨 번호 유효성 검사 테스트", () => {
  const executeValidation = (input) => () => startValidation(winningLottoNumbersValidation.winningNumbers, input);

  describe("예외 테스트", () => {
    test.each([
      {
        input: [1, 2, 3, 4, 5],
        expectedErrorMessage: ERROR_MESSAGE.sixNumbers,
      },
      {
        input: [1, 2, 3, 4, 5, 46],
        expectedErrorMessage: ERROR_MESSAGE.outOfRange,
      },
      {
        input: [0, 1, 2, 3, 4, 5],
        expectedErrorMessage: ERROR_MESSAGE.outOfRange,
      },
      {
        input: [1, 2, 3, 4, 4, 6],
        expectedErrorMessage: ERROR_MESSAGE.notDuplicated,
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
        input: [1, 2, 3, 4, 5, 6],
      },
      {
        input: [40, 41, 42, 43, 44, 45],
      },
    ])('입력값이 "$input"일 때 에러가 발생하지 않는다.', ({ input }) => {
      expect(executeValidation(input)).not.toThrow();
    });
  });
});
