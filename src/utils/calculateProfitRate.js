const DECIMAL_PLACES = 2;

function calculateProfitRate(totalProfit, money) {
  const rate = ((totalProfit / money) * 100).toFixed(DECIMAL_PLACES);

  return Number(rate);
}

export { calculateProfitRate };
