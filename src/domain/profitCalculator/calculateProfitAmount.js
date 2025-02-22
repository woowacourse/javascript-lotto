import WINNING_PRICE from "../../constants/WINNING_PRICE.js";

const calculateProfitAmount = (winningResult) => {
  const totalWinningAmount = Object.entries(winningResult).reduce((proceeds, [matchCount, winningCount]) => {
    return proceeds + WINNING_PRICE[matchCount] * winningCount;
  }, 0);
  return totalWinningAmount;
};

export default calculateProfitAmount;
