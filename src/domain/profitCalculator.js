import WINNING_PRICE from "../constants/WINNING_PRICE.js";

const profitCalculator = (purchaseAmount, winningResult) => {
  const totalWinningAmount = Object.entries(winningResult).reduce((count, [matchCount, winningCount]) => {
    return count + WINNING_PRICE[matchCount] * winningCount;
  }, 0);
  const rate = (totalWinningAmount / purchaseAmount) * 100;

  return rate;
};

export default profitCalculator;
