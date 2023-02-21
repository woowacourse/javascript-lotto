import toNumberFormatOfKor from '../utils/toNumberFormatOfKor';
import { RANKINGS_REWARD } from '../constants';

const lottoGameCalculator = {
  calculateReward(rankings) {
    return rankings.reduce((acc, ranking) => (acc += RANKINGS_REWARD[ranking]), 0);
  },

  calculateRewardRate(purchaseAmount, rankings) {
    const reward = lottoGameCalculator.calculateReward(rankings);

    return `${toNumberFormatOfKor((reward / purchaseAmount) * 100, 1)}%`;
  },
};

export default lottoGameCalculator;
