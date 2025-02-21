import validateBonusNumber from "./validateBonusNumber.js";
import CustomError from "../CustomError.js";
import { ERROR_MESSAGE, ERROR_PREFIX } from "../constants/message.js";
import { LOTTO_RULE } from "../constants/lotto.js";

describe("validateBonusNumber 유효성 검사", () => {
  test("보너스 번호가 정수가 아니면 에러가 발생한다.", () => {
    const bonusNumber = 1.5;
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    expect(() => validateBonusNumber(bonusNumber, winningNumbers)).toThrow(
      new CustomError(ERROR_MESSAGE.INVALID_INTEGER, ERROR_PREFIX.typeError)
    );
  });

  test.each([[0], [46]])(
    `보너스 번호가 ${LOTTO_RULE.MIN_LOTTO_NUMBER} ~ ${LOTTO_RULE.MAX_LOTTO_NUMBER}에 포함되지 않으면 에러가 발생한다.`,
    (number) => {
      const winningNumbers = [2, 3, 4, 5, 6, 7];
      expect(() => validateBonusNumber(number, winningNumbers)).toThrow(
        new CustomError(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE, ERROR_PREFIX.rangeError)
      );
    }
  );

  test("당첨 번호에 중복이 있는 경우 에러가 발생한다.", () => {
    const bonusNumber = 1;
    const numbers = [1, 2, 3, 4, 5, 6];
    expect(() => validateBonusNumber(bonusNumber, numbers)).toThrow(
      new CustomError(ERROR_MESSAGE.INVALID_DUPLICATE_BONUS_NUMBER, ERROR_PREFIX.duplicateError)
    );
  });

  test("보너스 번호가 45이면 에러가 발생하지 않는다.", () => {
    const bonusNumber = 45;
    const numbers = [1, 2, 3, 4, 5, 6];
    expect(() => validateBonusNumber(bonusNumber, numbers)).not.toThrow();
  });
});
