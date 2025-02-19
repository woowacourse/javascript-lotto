import { validateTypeAll } from "../../src/validators/WinningNumbersValidator";

describe("당첨 번호 검증", () => {
  describe("예외 케이스", () => {
    test("당첨 번호가 숫자가 아니면 에러가 발생한다.", () => {
      const winningNumbers = [null, 1, 2, 3, 4, 5];

      expect(() => validateTypeAll(winningNumbers)).toThrow(
        "당첨 번호은(는) 숫자여야 합니다."
      );
    });
  });
});
