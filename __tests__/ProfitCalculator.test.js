import WINNING_PRICE from "../src/constants/WINNING_PRICE";
import profitCalculator from "../src/domain/profitCalculator";

test("구매한 금액과 당첨결과를 바탕으로 수익률을 구한다.", () => {
  const winningResult = {
    6: 1,
    "5+1": 0,
    5: 0,
    4: 0,
    3: 0,
  };

  const money = 5000;

  const rate = profitCalculator(money, winningResult);

  expect(rate).toBe((WINNING_PRICE["6"] / money) * 100);
});
