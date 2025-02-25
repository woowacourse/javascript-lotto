import Calculator from "../src/Calculator.js";
import { WINNING } from "../src/constant/lotto.js";
import { KEYS } from "../src/constant/lotto.js";

describe("Calculator test", () => {
  test("당첨금을 계산한다.", () => {
    const winningCount = {
      [KEYS.FIRST]: 0,
      [KEYS.SECOND]: 0,
      [KEYS.THIRD]: 2,
      [KEYS.FOURTH]: 0,
      [KEYS.FIFTH]: 0,
    };
    const totalPrize = Calculator.getTotalPrize(winningCount);
    const expectedTotalPrize =
      winningCount[KEYS.THIRD] * WINNING[KEYS.THIRD].PRIZES;

    expect(totalPrize).toBe(expectedTotalPrize);
  });

  test("수익률을 계산한다.", () => {
    const amount = 5_000;
    const totalPrize = 50_000;
    const yieldRate = Calculator.getYieldRate(amount, totalPrize);
    const expectedYieldRate = 1_000;

    expect(yieldRate).toBe(expectedYieldRate);
  });

  test("구매 수량을 계산한다.", () => {
    const amount = 5_000;
    const quantity = Calculator.getQuantity(amount);
    const expectedQuantity = 5;

    expect(quantity).toBe(expectedQuantity);
  });
});
