const RateOfReturnCalculator = (purchaseAmount, matchStats) => {
  const PRIZE = {
    3: 5000,
    4: 50000,
    5: 1500000,
    '5+보너스': 30000000,
    6: 2000000000,
  };
  const totalPrizeMoney = Object.keys(PRIZE).reduce(
    (acc, cur) => acc + PRIZE[cur] * matchStats[cur],
    0,
  );
  const rate = (totalPrizeMoney / purchaseAmount) * 100;
  const rateOfReturn = Math.round(rate * 10) / 10;
  return rateOfReturn.toFixed(1);
};

export default RateOfReturnCalculator;
