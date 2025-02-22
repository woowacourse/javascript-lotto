import WINNING_PRICE from "../src/constants/WINNING_PRICE";
import { MATCH_COUNT } from "../src/constants/constant";
import profitCalculator from "../src/domain/profitCalculator/profitCalculator";

test("구매한 금액과 당첨결과를 바탕으로 수익률을 구한다.", () => {
  const winningResult = {
    [MATCH_COUNT.SIX]: 1,
    [MATCH_COUNT.FIVE_BONUS]: 0,
    [MATCH_COUNT.FIVE]: 0,
    [MATCH_COUNT.FOUR]: 0,
    [MATCH_COUNT.THREE]: 0,
  };

  const money = 5000;

  const rate = profitCalculator(money, winningResult);

  expect(rate).toBe((WINNING_PRICE[MATCH_COUNT.SIX] / money) * 100);
});
