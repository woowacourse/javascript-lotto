import { PRIZE_PER_RANK } from "../constants";

export const getReturnRate = (prizeList, purchaseAmount) => {
  const totalPrize = prizeList.reduce((acc, count, index) => {
    return acc + (PRIZE_PER_RANK[index] ?? 0) * count;
  }, 0);

  return Math.round((totalPrize / purchaseAmount) * 100 * 10) / 10;
};
