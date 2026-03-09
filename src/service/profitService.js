import { PRIZE } from "../constants/constant.js";

export function profitService(money, result) {
  const totalPrize =
    result.FIRST * PRIZE.FIRST +
    result.SECOND * PRIZE.SECOND +
    result.THIRD * PRIZE.THIRD +
    result.FOURTH * PRIZE.FOURTH +
    result.FIFTH * PRIZE.FIFTH;

  const profit = ((totalPrize / money) * 100).toFixed(1);

  return profit;
}
