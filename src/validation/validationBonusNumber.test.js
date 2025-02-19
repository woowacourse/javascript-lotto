import { validationBonusNumber } from "./validationBonusNumber.js";

describe("validationBonusNumber 유효성 검사", () => {
  test("보너스 번호가 정수가 아니면 에러가 발생한다.", () => {
    const bonusNumber = 1.5;
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    expect(() => validationBonusNumber(bonusNumber, winningNumbers)).toThrow();
  });

  test.each([[0], [46]])(
    "보너스 번호가 1 ~ 45에 포함되지 않으면 에러가 발생한다.",
    (number) => {
      const winningNumbers = [2, 3, 4, 5, 6, 7];
      expect(() => validationBonusNumber(number, winningNumbers)).toThrow();
    }
  );
});
