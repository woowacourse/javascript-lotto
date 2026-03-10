import Rank from "../../src/domain/Rank.js";

describe("등수 가져오기", () => {
  describe("매칭되는 숫자와 보너스 여부로 랭킹을 반환한다", () => {
    test.each([
      [{ matchCount: 6, hasBonus: false }, Rank.FIRST],
      [{ matchCount: 5, hasBonus: true }, Rank.SECOND],
      [{ matchCount: 5, hasBonus: false }, Rank.THIRD],
      [{ matchCount: 4, hasBonus: false }, Rank.FOURTH],
      [{ matchCount: 3, hasBonus: false }, Rank.FIFTH],
      [{ matchCount: 2, hasBonus: false }, Rank.MISS],
      [{ matchCount: 1, hasBonus: false }, Rank.MISS],
      [{ matchCount: 0, hasBonus: false }, Rank.MISS],
    ])("%o 의 등수는 %s", ({ matchCount, hasBonus }, expected) => {
      expect(Rank.getRank({ matchCount, hasBonus })).toBe(expected);
    });
  });
});
