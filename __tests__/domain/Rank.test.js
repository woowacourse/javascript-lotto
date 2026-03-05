import Rank from "../../src/domain/Rank.js";

describe("등수 가져오기", () => {
  describe("매칭되는 숫자와 보너스 여부로 랭킹을 반환한다", () => {
    test.each([
      [{ winning: 6, hasBonus: false }, Rank.FIRST],
      [{ winning: 5, hasBonus: true }, Rank.SECOND],
      [{ winning: 5, hasBonus: false }, Rank.THIRD],
      [{ winning: 4, hasBonus: false }, Rank.FOURTH],
      [{ winning: 3, hasBonus: false }, Rank.FIFTH],
      [{ winning: 2, hasBonus: false }, Rank.MISS],
      [{ winning: 1, hasBonus: false }, Rank.MISS],
      [{ winning: 0, hasBonus: false }, Rank.MISS],
    ])("%o 의 등수는 %s", (result, expected) => {
      expect(Rank.getRank(result)).toBe(expected);
    });
  });
});
