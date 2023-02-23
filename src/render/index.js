import { $ } from '../dom/dom';
import renderPurchasedLotto from './renderPurcahsedLotto';
import renderStatistics from './renderStatistics';
import renderWinningLottoForm from './renderWinningLottoForm';
import renderRestart from './restart';

const render = {
  purchasedLotto: (lottos) => {
    renderPurchasedLotto(lottos);
  },

  winningLottoForm: () => renderWinningLottoForm(),

  statistics: (rankings, rewardRate) => renderStatistics(rankings, rewardRate),

  restart: () => renderRestart(),

  hideElement: (element) => $(element).classList.add('hidden'),

  showElement: (element) => $(element).classList.remove('hidden'),
};

export default render;
