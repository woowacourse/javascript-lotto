import { RANKINGS_REWARD } from '../constants';

const lottoGameCalculator = {
  calculateReward(rankings) {
    return rankings.reduce((acc, ranking) => (acc += RANKINGS_REWARD[ranking]), 0);
  },

  calculateRewardRate(purchaseAmount, rankings) {
    const reward = lottoGameCalculator.calculateReward(rankings);
    const rewardRate = (reward / purchaseAmount) * 100;

    return `${Number(rewardRate.toFixed(1)).toLocaleString()}%`;
  },
};

export default lottoGameCalculator;
