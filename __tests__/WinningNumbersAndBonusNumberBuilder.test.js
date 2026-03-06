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

    test("당첨 번호가 중복되면 에러를 반환한다.", () => {
      // given
      const builder = new WinningNumbersAndBonusNumberBuilder();

      // when & then
      expect(() =>
        builder.validateWinningNumbers([1, 2, 3, 4, 5, 5]),
      ).toThrow();
    });
  });

  describe("validateBonusNumber", () => {
    test("보너스 번호는 당첨 번호에 포함되지 않은 1부터 45까지의 정수여야한다.", () => {
      // given
      const builder = new WinningNumbersAndBonusNumberBuilder();

      // when
      builder.setWinningNumbers([1, 2, 3, 4, 5, 6]);

      // then
      expect(() => builder.validateBonusNumber(7)).not.toThrow();
    });

    test("당첨 번호에 이미 포함된 번호면 에러를 반환한다.", () => {
      // given
      const builder = new WinningNumbersAndBonusNumberBuilder();

      // when
      builder.setWinningNumbers([1, 2, 3, 4, 5, 6]);

      // then
      expect(() => builder.validateBonusNumber(6)).toThrow();
    });
  });
});
