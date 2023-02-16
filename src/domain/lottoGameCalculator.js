const lottoGameCalculator = {
  calculateReward(rankings) {
    const rewardMap = {
      1: 2000000000,
      2: 30000000,
      3: 1500000,
      4: 50000,
      5: 5000,
    };

    return rankings.reduce((acc, ranking) => (acc += rewardMap[ranking]), 0);
  },

  calculateRewardRate(lottePurchaseAmount, rankings) {
    const reward = lottoGameCalculator.calculateReward(rankings);

    return `${((reward / lottePurchaseAmount) * 100)
      .toFixed(1)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}%`;
  },
};

export default lottoGameCalculator;
