import Calculator from "../src/Calculator.js";
import { KEYS } from "../src/constant/lotto.js";

describe("Calculator test", () => {
  test.each([
    [[[1, 2, 3, 4, 5, 6]], 1, "1등"],
    [[[1, 2, 3, 4, 5, 9]], 1, "2등"],
    [[[1, 2, 3, 4, 5, 10]], 1, "3등"],
    [[[1, 2, 3, 4, 7, 10]], 1, "4등"],
    [[[1, 2, 3, 8, 7, 10]], 1, "5등"],
  ])("일치하는 개수에 맞는 등수의 값이 증가한다.", (lottos, expected, key) => {
    const winningCount = Calculator.getWinningCount(lottos, {
      winning: [1, 2, 3, 4, 5, 6],
      bonus: 9,
    });

    expect(winningCount[key]).toBe(expected);
  });

  test("꽝이면 증가하지 않는다.", () => {
    const lottos = [
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
    ];
    const winningInfo = {
      winning: [1, 2, 3, 4, 5, 6],
      bonus: 9,
    };
    const winningCount = Calculator.getWinningCount(lottos, winningInfo);
    const expected = [0, 0, 0, 0, 0];

    expect(Object.values(winningCount)).toEqual(expected);
  });

  test("당첨금을 계산한다.", () => {
    const winningCount = {
      [KEYS.FIRST]: 0,
      [KEYS.SECOND]: 0,
      [KEYS.THIRD]: 2,
      [KEYS.FOURTH]: 0,
      [KEYS.FIFTH]: 0,
    };
    const totalPrize = Calculator.getTotalPrize(winningCount);
    const expectedTotalPrize = 3_000_000;

    expect(totalPrize).toBe(expectedTotalPrize);
  });

  test("수익률을 계산한다.", () => {
    const amount = "5000";
    const totalPrize = 50_000;
    const yieldRate = Calculator.getYieldRate(amount, totalPrize);
    const expectedYieldRate = 1_000;

    expect(yieldRate).toBe(expectedYieldRate);
  });
});
