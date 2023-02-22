import renderPurchasedLotto from './renderPurcahsedLotto';
import renderWinningForm from './renderWinningForm';

const render = {
  purchasedLotto: (lottos) => {
    renderPurchasedLotto(lottos);
  },

  winningForm: () => renderWinningForm(),
};

export default render;
