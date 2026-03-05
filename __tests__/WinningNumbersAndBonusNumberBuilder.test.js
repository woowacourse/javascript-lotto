import WinningNumbersAndBonusNumberBuilder from "../src/WinningNumbersAndBonusNumberBuilder";

describe("WinningNumbersAndBonusNumberBuilder 클래스 유닛 테스트", () => {
  describe("validateWinningNumbers", () => {
    test("당첨 번호는 1부터 45까지의 정수여야한다.", () => {
      // given
      const builder = new WinningNumbersAndBonusNumberBuilder();

      // when & then
      expect(() =>
        builder.validateWinningNumbers([1, 2, 3, 4, 5, 6]),
      ).not.toThrow();
    });

    test("당첨 번호가 정수가 아니면 에러를 반환한다.", () => {
      // given
      const builder = new WinningNumbersAndBonusNumberBuilder();

      // when & then
      expect(() =>
        builder.validateWinningNumbers([1, 2, 3, 4, 5, 6.1]),
      ).toThrow();
    });

    test("당첨 번호가 1보다 작으면 에러를 반환한다.", () => {
      // given
      const builder = new WinningNumbersAndBonusNumberBuilder();

      // when & then
      expect(() =>
        builder.validateWinningNumbers([-1, 2, 3, 4, 5, 6]),
      ).toThrow();
    });

    test("당첨 번호가 45보다 크면 에러를 반환한다.", () => {
      // given
      const builder = new WinningNumbersAndBonusNumberBuilder();

      // when & then
      expect(() =>
        builder.validateWinningNumbers([1, 2, 3, 4, 5, 46]),
      ).toThrow();
    });
  });
});
