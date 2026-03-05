const prize = {
  FIRST: 2000000000,
  SECOND: 30000000,
  THIRD: 1500000,
  FOURTH: 50000,
  FIFTH: 5000,
};

export function getProfit(money, result) {
  const totalPrize =
    result.FIRST * prize.FIRST +
    result.SECOND * prize.SECOND +
    result.THIRD * prize.THIRD +
    result.FOURTH * prize.FOURTH +
    result.FIFTH * prize.FIFTH;

  const profit = ((totalPrize / money) * 100).toFixed(1);
  console.log(profit);

  return profit;
}
