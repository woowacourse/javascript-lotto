import { lottoGame } from '../store.js';
import lottoGameView from './view.js';
import { LOTTO_PRICE } from '../constants.js';

export default {
  purchaseLottoItems(cost) {
    const lottoItemCount = cost / LOTTO_PRICE;
    lottoGame.initLottoItemList();
    lottoGame.addLottoItems(lottoItemCount);
    lottoGameView.renderResult(lottoGame.lottoItemList);
  },

  toggleLottoItemNumbers(checked) {
    if (checked) {
      lottoGameView.displayLottoNumbers();
      return;
    }
    lottoGameView.hideLottoNumbers();
  },

  initToggleButton() {
    lottoGameView.resetToggleButton();
  },

  openResultModal() {
    lottoGameView.openResultModal();
  },

  closeResultModal() {
    lottoGameView.closeResultModal();
  }

};
