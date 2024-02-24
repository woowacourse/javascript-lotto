const DECIMAL_PLACES = 2;

function calculateProfitRate(totalPrize, money) {
  if (totalPrize === 0) return 0;

  const rate = ((totalPrize / money) * 100).toFixed(DECIMAL_PLACES);

  return rate;
}

export { calculateProfitRate, DECIMAL_PLACES };
