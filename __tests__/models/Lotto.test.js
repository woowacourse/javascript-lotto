import Lotto from "../../src/models/Lotto.js";

describe("models/Lotto", () => {
  test("로또 객체를 만들 수 있다.", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(numbers);

    expect(lotto.numbers).toEqual(numbers);
  });

  test("incrementWinningNumber()가 호출되면 matchResult의 matchCount가 1 증가한다.", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    lotto.incrementWinningNumbers();
    expect(lotto.matchResult.matchCount).toBe(1);
  });

  test("markBonusMatched()가 호출되면 matchResult의 isBonusMatched가 true가 된다.", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    lotto.markBonusMatched();
    expect(lotto.matchResult.isBonusMatched).toBe(true);
  });
});
