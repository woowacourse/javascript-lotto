import { HUNDRED_PERCENT, MATCH_COUNT } from "../src/constants/constant.js";
import calculateProfitAmount from "../src/domain/profitCalculator/calculateProfitAmount.js";
import calculateProfitRate from "../src/domain/profitCalculator/calculateProfitRate.js";

describe("calculateProfitRate 도메인 테스트", () => {
  test("구매금액과 수익액을 바탕으로 정확한 수익률을 계산해야 한다.", () => {
    const winningResult = {
      [MATCH_COUNT.SIX]: 0,
      [MATCH_COUNT.FIVE_BONUS]: 0,
      [MATCH_COUNT.FIVE]: 0,
      [MATCH_COUNT.FOUR]: 0,
      [MATCH_COUNT.THREE]: 1,
    };
    const purchaseAmount = 5000;
    const profitAmount = calculateProfitAmount(winningResult);
    expect(calculateProfitRate(purchaseAmount, profitAmount)).toBe((purchaseAmount / profitAmount) * HUNDRED_PERCENT);
  });
});
