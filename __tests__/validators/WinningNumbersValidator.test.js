import { validateCount } from "../../src/validators/validate";
import {
  validateTypeAll,
  validateRangeAll,
  WinningNumbersValidator,
} from "../../src/validators/WinningNumbersValidator";

describe("당첨 번호 검증", () => {
  describe("정상 케이스", () => {
    test("당첨 번호는 모두 숫자이며, 6개여야 하고, 1~45 범위 내에 있어야 한다.", () => {
      const winningNumbers = [1, 2, 3, 4, 5, 6];

      expect(() =>
        WinningNumbersValidator.validate(winningNumbers)
      ).not.toThrow();
    });
  });

  describe("예외 케이스", () => {
    test("당첨 번호가 숫자가 아니면 에러가 발생한다.", () => {
      const winningNumbers = [null, 1, 2, 3, 4, 5];

      expect(() => validateTypeAll(winningNumbers)).toThrow(
        "당첨 번호은(는) 숫자여야 합니다."
      );
    });

    test("당첨 번호가 6개가 아니면 에러가 발생한다.", () => {
      const winningNumbers = [1, 2, 3, 4, 5];

      expect(() => validateCount("당첨 번호", winningNumbers)).toThrow(
        "당첨 번호은(는) 6개여야 합니다."
      );
    });

    test("당첨 번호의 범위가 1~45 사이가 아니면 에러가 발생한다.", () => {
      const winningNumbers = [0, 2, 3, 4, 5, 46];

      expect(() => validateRangeAll(winningNumbers)).toThrow(
        "당첨 번호은(는) 1 이상 45 이하여야 합니다."
      );
    });
  });
});
