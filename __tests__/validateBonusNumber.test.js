import { BONUS_NUMBER_ERROR_MESSAGES } from "../src/constants/constants.js";
import validateBonusNumber from "../src/validations/validateBonusNumber.js";

describe("보너스 번호 유효성 테스트", () => {
  test.each([
    {
      description: "숫자가 아닌 경우",
      input: "숫자아님",
      expectedErrorMessage: BONUS_NUMBER_ERROR_MESSAGES.NOT_A_NUMBER,
    },
    {
      description: "정수가 아닌 경우",
      input: "1.1",
      expectedErrorMessage: BONUS_NUMBER_ERROR_MESSAGES.NOT_AN_INTEGER,
    },
    {
      description: "1 미만인 경우",
      input: "0",
      expectedErrorMessage: BONUS_NUMBER_ERROR_MESSAGES.OUT_OF_RANGE,
    },
    {
      description: "45 초과인 경우",
      input: "46",
      expectedErrorMessage: BONUS_NUMBER_ERROR_MESSAGES.OUT_OF_RANGE,
    },
    {
      description: "당첨 번호와 일치하는 경우",
      input: "11",
      expectedErrorMessage: BONUS_NUMBER_ERROR_MESSAGES.DUPLICATE_NUMBER,
    },
  ])(
    "보너스 번호가 $description 에러가 발생한다.",
    ({ input, expectedErrorMessage }) => {
      // given
      // when & then
      expect(() => {
        const winningNumbers = [11, 12, 13, 14, 15, 16];
        validateBonusNumber(input, winningNumbers);
      }).toThrow(expectedErrorMessage);
    },
  );
});
