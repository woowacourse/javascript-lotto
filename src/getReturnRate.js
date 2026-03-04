export const getReturnRate = (prizeList, purchaseAmount) => {
  const totalPrize = prizeList.reduce((acc, count, index) => {
    return acc + (PRIZE_PER_RANK[index] ?? 0) * count;
  }, 0);

  return Math.round((totalPrize / purchaseAmount) * 100 * 10) / 10;
};

const PRIZE_PER_RANK = Object.freeze({
  1: 2000000000,
  2: 30000000,
  3: 1500000,
  4: 50000,
  5: 5000,
});
