import { RANKINGS_REWARD } from '../constants';

const lottoGameCalculator = {
  calculateReward(rankings) {
    return rankings.reduce((acc, ranking) => (acc += RANKINGS_REWARD[ranking]), 0);
  },

  calculateRewardRate(purchaseAmount, rankings) {
    const reward = lottoGameCalculator.calculateReward(rankings);

    return `${((reward / purchaseAmount) * 100).toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}%`;
  },
};

export default lottoGameCalculator;
