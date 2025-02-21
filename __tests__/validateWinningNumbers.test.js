import {
  LOTTO_LENGTH,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
  WINNING_NUMBERS_ERROR_MESSAGES,
} from "../src/constants/constants.js";
import validateWinningNumbers from "../src/validations/validateWinningNumbers.js";

describe("당첨 번호 유효성 테스트", () => {
  test.each([
    {
      description: `당첨 번호의 숫자가 ${LOTTO_LENGTH}개가 아닌 경우`,
      input: "1,2,3,4,5,6,7,8,9,10",
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
      description: `당첨 번호에서 ${MIN_LOTTO_NUMBER} 미만인 숫자가 있는 경우`,
      input: `1,2,3,4,5,${MIN_LOTTO_NUMBER - 1}`,
      expectedErrorMessage: WINNING_NUMBERS_ERROR_MESSAGES.OUT_OF_RANGE,
    },
    {
      description: `당첨 번호에서 ${MAX_LOTTO_NUMBER} 초과인 숫자가 있는 경우`,
      input: `1,2,3,4,5,${MAX_LOTTO_NUMBER + 1}`,
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
