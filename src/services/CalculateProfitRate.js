export function calculateProfitRate(resultData, purchaseAmount) {
  const totalPrize = resultData.reduce((sum, rank) => {
    return sum + rank.money * rank.count;
  }, 0);

  const rate = (totalPrize / purchaseAmount) * 100;
  return Math.round(rate * 10) / 10;
}
