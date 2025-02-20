import WINNING_PRICE from "../constants/WINNING_PRICE.js";
import { HUNDRED_PERCENT } from "../constants/constant.js";

const profitCalculator = (purchaseAmount, winningResult) => {
  const totalWinningAmount = Object.entries(winningResult).reduce((count, [matchCount, winningCount]) => {
    return count + WINNING_PRICE[matchCount] * winningCount;
  }, 0);
  const rate = (totalWinningAmount / purchaseAmount) * HUNDRED_PERCENT;

  return rate;
};

export default profitCalculator;
