import winningLottoBonusValidation from "../src/validation/winningLottoBonusValidation.js";
import startValidation from "../src/validation/startValidation.js";
import ERROR_MESSAGE from "../src/constants/errorMessage.js";

describe("로또 보너스 번호 유효성 검사 테스트", () => {
  const executeValidation = (input) => () => startValidation(winningLottoBonusValidation.winningBonus, input);

  describe("예외 테스트", () => {
    test.each([
      {
        input: {
          normalNumbers: [1, 2, 3, 4, 5, 6],
          bonusNumber: 1,
        },
        expectedErrorMessage: ERROR_MESSAGE.notInWinningNumbers,
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
        input: {
          normalNumbers: [1, 2, 3, 4, 5, 6],
          bonusNumber: 7,
        },
      },
    ])('입력값이 "$input"일 때 에러가 발생하지 않는다.', ({ input }) => {
      expect(executeValidation(input)).not.toThrow();
    });
  });
});
