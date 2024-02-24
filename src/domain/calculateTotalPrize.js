const PRIZE = [5000, 50000, 1500000, 30000000, 2000000000];

function calculateTotalPrize(ranks) {
  return ranks.reduce((acc, curr, index) => acc + curr * PRIZE[index], 0);
}

export { PRIZE, calculateTotalPrize };
