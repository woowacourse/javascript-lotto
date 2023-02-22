import renderPurchasedLotto from './renderPurcahsedLotto';
import renderStatistics from './renderStatistics';
import renderWinningForm from './renderWinningForm';

const render = {
  purchasedLotto: (lottos) => {
    renderPurchasedLotto(lottos);
  },

  winningForm: () => renderWinningForm(),

  statistics: (rankings, rewardRate) => renderStatistics(rankings, rewardRate),
};

export default render;
