import { LOTTO_PRICE, LOTTO_PRIZE } from "../lottoConstants/systemConstants.js";

const calculateWinningAmount = (matchingCount) => {
  return Object.keys(matchingCount).reduce((sum, count) => sum + matchingCount[count] * (LOTTO_PRIZE[count] || 0), 0);
};

export const calculateProfitRate = (matchingCount, lottoCount) => {
  const winningAmount = calculateWinningAmount(matchingCount);
  const profitRatio = winningAmount / (lottoCount * LOTTO_PRICE.UNIT);

  return (profitRatio * 100).toFixed(1);
};
