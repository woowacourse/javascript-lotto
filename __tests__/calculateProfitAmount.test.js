import { MATCH_COUNT } from "../src/constants/constant.js";
import WINNING_PRICE from "../src/constants/WINNING_PRICE.js";
import calculateProfitAmount from "../src/domain/profitCalculator/calculateProfitAmount.js";

test("카운트된 당첨 결과를 바탕으로 수익액을 정확히 계산한다.", () => {
  const winningResult = {
    [MATCH_COUNT.SIX]: 0,
    [MATCH_COUNT.FIVE_BONUS]: 0,
    [MATCH_COUNT.FIVE]: 0,
    [MATCH_COUNT.FOUR]: 0,
    [MATCH_COUNT.THREE]: 1,
  };

  const expectedAmount = WINNING_PRICE[MATCH_COUNT.THREE] * 1;

  expect(calculateProfitAmount(winningResult)).toBe(expectedAmount);
});
