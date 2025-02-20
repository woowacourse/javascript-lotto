import WINNING_PRICE from "../constants/WINNING_PRICE.js";
import { HUNDRED_PERCENT } from "../constants/constant.js";
import processDecimalPoint from "../utils/processDecimalPoint.js";

const profitCalculator = (purchaseAmount, winningResult) => {
  const totalWinningAmount = Object.entries(winningResult).reduce((count, [matchCount, winningCount]) => {
    return count + WINNING_PRICE[matchCount] * winningCount;
  }, 0);
  const rate = (totalWinningAmount / purchaseAmount) * HUNDRED_PERCENT;
  const profitRate = processDecimalPoint(rate);
  return profitRate;
};

export default profitCalculator;
