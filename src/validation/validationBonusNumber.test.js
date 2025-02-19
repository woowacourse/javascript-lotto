import validationBonusNumber from "./validationBonusNumber.js";
import CustomError from "../CustomError.js";
import { ERROR_MESSAGE } from "../constants/message.js";

describe("validationBonusNumber 유효성 검사", () => {
  test("보너스 번호가 정수가 아니면 에러가 발생한다.", () => {
    const bonusNumber = 1.5;
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    expect(() => validationBonusNumber(bonusNumber, winningNumbers)).toThrow(
      new CustomError(ERROR_MESSAGE.INVALID_INTEGER)
    );
  });

  test.each([[0], [46]])(
    "보너스 번호가 1 ~ 45에 포함되지 않으면 에러가 발생한다.",
    (number) => {
      const winningNumbers = [2, 3, 4, 5, 6, 7];
      expect(() => validationBonusNumber(number, winningNumbers)).toThrow(
        new CustomError(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE)
      );
    }
  );

  test("당첨 번호에 중복이 있는 경우 에러가 발생한다.", () => {
    const bonusNumber = 1;
    const numbers = [1, 2, 3, 4, 5, 6];
    expect(() => validationBonusNumber(bonusNumber, numbers)).toThrow(
      new CustomError(ERROR_MESSAGE.INVALID_DUPLICATE_BONUS_NUMBER)
    );
  });

  test("보너스 번호가 유효성 검사를 통과한다", () => {
    const bonusNumber = 45;
    const numbers = [1, 2, 3, 4, 5, 6];
    expect(() => validationBonusNumber(bonusNumber, numbers)).not.toThrow();
  });
});
