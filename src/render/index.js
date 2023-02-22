import renderPurchasedLotto from './renderPurcahsedLotto';
import renderStatistics from './renderStatistics';
import renderWinningForm from './renderWinningForm';
import renderRestart from './restart';

const render = {
  purchasedLotto: (lottos) => {
    renderPurchasedLotto(lottos);
  },

  winningForm: () => renderWinningForm(),

  statistics: (rankings, rewardRate) => renderStatistics(rankings, rewardRate),

  restart: () => renderRestart(),
};

export default render;
