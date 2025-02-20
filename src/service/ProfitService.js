import { LOTTO_PRIZE, LOTTO_PRICE } from "../constants/systemConstants.js";

const calculateWinningAmount = (matchingCount) => {
  return Object.keys(matchingCount).reduce((sum, count) => {
    return sum + matchingCount[count] * (LOTTO_PRIZE[count] || 0);
  }, 0);
};

export const calculateProfitRate = (matchingCount, lottoCount) => {
  const winningAmount = calculateWinningAmount(matchingCount);
  const profitRatio = winningAmount / (lottoCount * LOTTO_PRICE);

  return (profitRatio * 100).toFixed(1);
};
