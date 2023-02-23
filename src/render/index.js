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

  outStatistics: () => $('.winning-statistics').classList.add('hidden'),
};

export default render;
