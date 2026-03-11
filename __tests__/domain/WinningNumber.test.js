import Lotto from "../../src/domain/Lotto.js";
import WinningNumber from "../../src/domain/WinningNumber.js";

describe("WinningNumbers 테스트", () => {
  const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);

  describe("생성자 테스트", () => {
    test("보너스 번호가 당첨 번호랑 중복되면 예외", () => {
      expect(() => new WinningNumber(winningLotto, 6)).toThrow("[ERROR]");
    });

    test("정상적인 값으로 생성된다", () => {
      expect(() => new WinningNumber(winningLotto, 7)).not.toThrow();
    });

    test("보너스 번호는 로또 숫자 범위 안이여야 한다.", () => {
      expect(() => new WinningNumber(winningLotto, 0)).toThrow("[ERROR]");
      expect(() => new WinningNumber(winningLotto, 46)).toThrow("[ERROR]");
    });
  });

  describe("getter 테스트", () => {
    const winningNumber = new WinningNumber(winningLotto, 7);

    test("당첨 번호를 반환한다", () => {
      expect(winningNumber.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test("보너스 번호를 반환한다", () => {
      expect(winningNumber.getBonusNumber()).toBe(7);
    });
  });
});
