import {
  updateBonusMatched,
  updateMatchCount,
} from "../../src/domain/updateMatchResult.js";
import Lotto from "../../src/models/Lotto.js";

describe("domain/updateMatchResult", () => {
  describe("updateMatchCount", () => {
    test("당첨번호와 로또 인스턴스를 받아서 매칭 개수를 반환한다.", () => {
      // Given
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const myLotto = new Lotto([1, 2, 3, 4, 5, 6]);

      // When
      const result = updateMatchCount(myLotto, winningNumbers);

      // Then
      expect(result).toBe(6);
    });
  });
  describe("updateBonusMatched", () => {
    test("보너스 번호가 로또 인스턴스 내에 존재하면 보너스 당첨 여부를 true로 변경한다.", () => {
      // Given
      const bonusNumber = 5;
      const myLotto = new Lotto([1, 2, 3, 4, 5, 6]);

      // When
      const result = updateBonusMatched(myLotto, bonusNumber);

      // Then
      expect(result).toBe(true);
    });
  });
});
