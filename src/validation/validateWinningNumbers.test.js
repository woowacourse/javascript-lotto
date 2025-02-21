import validateWinningNumbers from "./validateWinningNumbers.js";
import CustomError from "../CustomError.js";
import { ERROR_MESSAGE, ERROR_PREFIX } from "../constants/message.js";
import { LOTTO_RULE } from "../constants/lotto.js";

describe("validateWinningNumbers 유효성 검사", () => {
  test(`당첨 번호의 개수가 ${LOTTO_RULE.LOTTO_LENGTH}개가 아니면 에러가 발생한다.`, () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(() => validateWinningNumbers(numbers)).toThrow(
      new CustomError(ERROR_MESSAGE.INVALID_LOTTO_LENGTH, ERROR_PREFIX.lengthError)
    );
  });

  test("당첨 번호에 중복이 있는 경우 에러가 발생한다.", () => {
    const numbers = [1, 2, 3, 4, 5, 5];
    expect(() => validateWinningNumbers(numbers)).toThrow(
      new CustomError(ERROR_MESSAGE.INVALID_DUPLICATE_NUMBER, ERROR_PREFIX.duplicateError)
    );
  });

  test("당첨 번호에 정수가 아닌 숫자가 있으면 에러가 발생한다..", () => {
    const numbers = [1, 2, 3, 4, 5, 5.5];
    expect(() => validateWinningNumbers(numbers)).toThrow(
      new CustomError(ERROR_MESSAGE.INVALID_INTEGER, ERROR_PREFIX.typeError)
    );
  });

  test.each([[[0, 2, 3, 4, 5, 6]], [[1, 2, 3, 4, 5, 46]]])(
    `당첨 번호의 숫자가 ${LOTTO_RULE.MIN_LOTTO_NUMBER} ~ ${LOTTO_RULE.MAX_LOTTO_NUMBER}에 포함되지 않으면 에러가 발생한다.`,
    (number) => {
      expect(() => validateWinningNumbers(number)).toThrow(
        new CustomError(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE, ERROR_PREFIX.rangeError)
      );
    }
  );

  test("당첨 번호가 [1, 2, 3, 4, 5, 6]이면 에러가 발생하지 않는다.", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    expect(() => validateWinningNumbers(numbers)).not.toThrow();
  });
});
