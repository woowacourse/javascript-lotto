import InputView from "../src/InputView.js";

describe("InputView 클래스 유닛 테스트", () => {
  describe("validateAmount 메서드 유닛 테스트", () => {
    test("amount가 음수이면 예외를 반환한다.", () => {
      // given
      const inputView = new InputView();
      const invalidAmounts = -1;

      // when & then
      expect(() => inputView.validateAmount(invalidAmounts)).toThrow();
    });

    test("amount가 0이면 예외를 반환한다.", () => {
      // given
      const inputView = new InputView();
      const invalidAmounts = 0;

      // when & then
      expect(() => inputView.validateAmount(invalidAmounts)).toThrow();
    });
  });

  describe("validateRetry", () => {
    test("입력값이 'y' 또는 'n'이 아니면 예외를 반환한다.", () => {
      // given
      const inputView = new InputView();
      const input = "x";

      // when & then
      expect(() => inputView.validateRetry(input)).toThrow();
    });
  });
});
