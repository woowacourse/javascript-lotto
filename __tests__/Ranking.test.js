import Lotto from "../src/Lotto.js";
import Ranking from "../src/Ranking.js";
import { KEYS, WINNING } from "../src/constant/lotto.js";

describe("Ranking", () => {
  test.each([
    [[new Lotto([1, 2, 3, 4, 5, 6])], 1, "1등"],
    [[new Lotto([1, 2, 3, 4, 5, 9])], 1, "2등"],
    [[new Lotto([1, 2, 3, 4, 5, 10])], 1, "3등"],
    [[new Lotto([1, 2, 3, 4, 7, 10])], 1, "4등"],
    [[new Lotto([1, 2, 3, 8, 7, 10])], 1, "5등"],
  ])("일치하는 개수에 맞는 등수의 값이 증가한다.", (lottos, expected, key) => {
    const winningRanks = Ranking.countWinningRanks(lottos, {
      winning: [1, 2, 3, 4, 5, 6],
      bonus: 9,
    });

    expect(winningRanks[key]).toBe(expected);
  });

  test("보너스 번호 일치", () => {
    expect(new Lotto([1, 2, 3, 4, 5, 6]).hasBonus(3)).toBe(true);
  });

  test("보너스 번호 불일치", () => {
    expect(new Lotto([1, 2, 3, 4, 5, 6]).hasBonus(7)).toBe(false);
  });

  test.each([[WINNING[KEYS.SECOND].MATCH, false]])(
    "일치하는 개수에 맞는 등수의 문자열을 반환한다.",
    (key, hasBonus) => {
      const rank = Ranking.getMatchedKey(key, hasBonus);

      expect(rank).toBe("3등");
    },
  );
});
