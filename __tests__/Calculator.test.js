import Calculator from "../src/Calculator.js";
import Ranking from "../src/Ranking.js";
import { KEYS } from "../src/constant/lotto.js";

describe("Caculator", () => {
  test("당첨금을 계산한다.", () => {
    const winningRanks = {
      [KEYS.FIRST]: 0,
      [KEYS.SECOND]: 0,
      [KEYS.THIRD]: 2,
      [KEYS.FOURTH]: 0,
      [KEYS.FIFTH]: 0,
    };
    const totalPrize = Calculator.getTotalPrize(winningRanks);

    expect(totalPrize).toBe(3_000_000);
  });

  test("수익률을 계산한다.", () => {
    const amount = "5000";
    const totalPrize = 50_000;
    const yieldRate = Calculator.getYieldRate(amount, totalPrize);

    expect(yieldRate).toBe("1000.0");
  });
});
