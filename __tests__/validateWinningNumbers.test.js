import { WINNING_NUMBERS_ERROR_MESSAGES } from "../src/constants/constants.js";
import validateWinningNumbers from "../src/domain/validation/validateWinningNumbers.js";

describe("당첨 번호 유효성 테스트", () => {
  test.each([
    {
      description: "숫자가 6개가 아닌 경우",
      input: "1,2,3,4,5,6,7",
      expectedErrorMessage: WINNING_NUMBERS_ERROR_MESSAGES.INVALID_COUNT,
    },
    {
      description: "숫자가 아닌 경우",
      input: "a,b,c,d,e,f",
      expectedErrorMessage: WINNING_NUMBERS_ERROR_MESSAGES.NOT_A_NUMBER,
    },
    {
      description: "정수가 아닌 경우",
      input: "1.1,2,3,4,5,6",
      expectedErrorMessage: WINNING_NUMBERS_ERROR_MESSAGES.NOT_AN_INTEGER,
    },
    {
      description: "숫자 범위가 1 미만인 경우",
      input: "1,2,3,0,4,5",
      expectedErrorMessage: WINNING_NUMBERS_ERROR_MESSAGES.OUT_OF_RANGE,
    },
    {
      description: "숫자 범위가 45 초과인 경우",
      input: "1,2,3,4,5,66",
      expectedErrorMessage: WINNING_NUMBERS_ERROR_MESSAGES.OUT_OF_RANGE,
    },
    {
      description: "숫자가 중복되는 경우",
      input: "1,2,3,4,4,5",
      expectedErrorMessage: WINNING_NUMBERS_ERROR_MESSAGES.DUPLICATE_NUMBER,
    },
  ])(
    "당첨 번호가 $description 에러가 발생한다.",
    ({ input, expectedErrorMessage }) => {
      // given
      // when & then
      expect(() => {
        validateWinningNumbers(input);
      }).toThrow(expectedErrorMessage);
    },
  );
});
