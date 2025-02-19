import { checkWinningNumbers } from "../../src/domain/checkResult.js";
import Lotto from "../../src/models/Lotto.js";

describe("domain/checkResult", () => {
  describe("checkWinningNumbers", () => {
    test("당첨번호와 로또 인스턴스를 받아서 매칭 개수를 반환한다.", () => {
      // Given
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const myLotto = new Lotto([1, 2, 3, 4, 5, 6]);

      // When
      const result = checkWinningNumbers(winningNumbers, myLotto);

      // Then
      expect(result).toBe(6);
    });
  });
  describe("checkBonusNumber", () => {});
});
