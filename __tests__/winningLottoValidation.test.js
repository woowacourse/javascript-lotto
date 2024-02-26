import winningLottoValidation from "../src/validation/winningLottoValidation.js";
import startValidation from "../src/validation/startValidation.js";
import ERROR_MESSAGE from "../src/constants/errorMessage.js";

describe("로또 당첨 번호와 보너스 번호의 공통 유효성 검사 테스트", () => {
  const executeValidation = (input) => () =>
    startValidation(winningLottoValidation.winningCombination, input);

  test.each([
    [
      {
        input: 0,
      },
      ERROR_MESSAGE.LOTTO_NUMBER_RANGE,
    ],
    [
      {
        input: 46,
      },
      ERROR_MESSAGE.LOTTO_NUMBER_RANGE,
    ],
  ])('입력값이 %o일 때 "%s" 메시지와 함께 에러가 발생해야 한다.', ({ input }, expectedErrorMessage) => {
    expect(executeValidation(input)).toThrow(expectedErrorMessage);
  });
});
