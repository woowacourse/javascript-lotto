import winningLottoNumbersValidation from "../src/validation/winningLottoNumbersValidation.js";
import startValidation from "../src/validation/startValidation.js";
import ERROR_MESSAGE from "../src/constants/errorMessage.js";

describe("로또 당첨 번호 유효성 검사 테스트", () => {
  const executeValidation = (input) => () =>
    startValidation(winningLottoNumbersValidation.winningNumbers, input);

  test.each([
    [
      {
        input: [1, 2, 3, 4, 5],
      },
      ERROR_MESSAGE.SIX_LENGTH,
    ],
    [
      {
        input: [1, 2, 3, 4, 4, 6],
      },
      ERROR_MESSAGE.UNIQUE_NUMBER,
    ],
  ])('입력값이 %o 일 때 "%s" 메시지와 함께 에러가 발생해야 한다.', ({ input }, expectedErrorMessage) => {
    expect(executeValidation(input)).toThrow(expectedErrorMessage);
  });
});
