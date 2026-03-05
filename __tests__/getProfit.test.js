import { getProfit } from "../src/service/getProfit.js";

describe("getProfit", () => {
  test("로또 당첨 수익률을 계산한다", () => {
    const result = {
      FIRST: 0,
      SECOND: 0,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 1,
    };

    const money = 8000;
    const profit = getProfit(money, result);
    expect(profit).toBe("62.5");
  });
});
