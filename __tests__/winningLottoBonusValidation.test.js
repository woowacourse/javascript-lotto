import winningLottoBonusValidation from "../src/validation/winningLottoBonusValidation.js";
import startValidation from "../src/validation/startValidation.js";
import ERROR_MESSAGE from "../src/constants/errorMessage.js";

describe("로또 보너스 번호 유효성 검사 테스트", () => {
  const executeValidation = (input) => () => startValidation(winningLottoBonusValidation.winningBonus, input);

  test.each([
    [
      {
        normalNumbers: [1, 2, 3, 4, 5, 6],
        bonusNumber: 1,
      },
      ERROR_MESSAGE.UNIQUE_BONUS_NUMBER,
    ],
  ])('입력값이 %o 일 때 "%s" 메시지와 함께 에러가 발생해야 한다.', (input, expectedErrorMessage) => {
    expect(executeValidation(input)).toThrow(expectedErrorMessage);
  });
});
