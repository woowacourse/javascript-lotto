import { PRIZE_PER_RANK } from "../constants";

export const getReturnRate = (prizeList, purchaseAmount) => {
  const totalPrize = prizeList.reduce((acc, count, rank) => {
    const prizeMoney = PRIZE_PER_RANK[rank] || 0;
    return acc + count * prizeMoney;
  }, 0);

  return Math.round((totalPrize / purchaseAmount) * 100 * 10) / 10;
};
