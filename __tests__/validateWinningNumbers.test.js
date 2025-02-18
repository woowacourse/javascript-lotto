import { WINNING_NUMBERS_ERROR_MESSAGES } from "../src/constants/constants.js";
import validateWinningNumbers from "../src/validations/validateWinningNumbers.js";

describe("당첨 번호 유효성 테스트", () => {
  test.each([
    {
      description: "당첨 번호의 숫자가 6개가 아닌 경우",
      input: "1,2,3,4,5,6,7",
      expectedErrorMessage: WINNING_NUMBERS_ERROR_MESSAGES.INVALID_COUNT,
    },
    {
      description: "당첨 번호 중 숫자가 아닌 값이 있는 경우",
      input: "a,b,c,d,e,f",
      expectedErrorMessage: WINNING_NUMBERS_ERROR_MESSAGES.NOT_A_NUMBER,
    },
    {
      description: "당첨 번호 중 정수가 아닌 숫자가 있는 경우",
      input: "1.1,2,3,4,5,6",
      expectedErrorMessage: WINNING_NUMBERS_ERROR_MESSAGES.NOT_AN_INTEGER,
    },
    {
      description: "당첨 번호에서 1 미만인 숫자가 있는 경우",
      input: "1,2,3,0,4,5",
      expectedErrorMessage: WINNING_NUMBERS_ERROR_MESSAGES.OUT_OF_RANGE,
    },
    {
      description: "당첨 번호에서 45 초과인 숫자가 있는 경우",
      input: "1,2,3,4,5,66",
      expectedErrorMessage: WINNING_NUMBERS_ERROR_MESSAGES.OUT_OF_RANGE,
    },
    {
      description: "당첨 번호의 숫자가 중복되는 경우",
      input: "1,2,3,4,4,5",
      expectedErrorMessage: WINNING_NUMBERS_ERROR_MESSAGES.DUPLICATE_NUMBER,
    },
  ])("$description 에러가 발생한다.", ({ input, expectedErrorMessage }) => {
    // given
    // when & then
    expect(() => {
      validateWinningNumbers(input);
    }).toThrow(expectedErrorMessage);
  });
});
