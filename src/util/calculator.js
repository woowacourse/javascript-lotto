export function calculateProfitRate(profit, price) {
  return Number(((profit / price) * 100).toFixed(1));
}

export function calculateMatchCount(array, number) {
  return array.filter((item) => item === number).length;
}
