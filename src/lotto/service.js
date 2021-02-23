import { lottoGame } from '../store.js';
import { getProfitRate } from '../utils/calculate.js';
import { getKRString } from '../utils/format.js';
import lottoGameView from './view.js';
import { LOTTO_PRICE } from '../constants.js';


const getTotalProfit = (rankItemList) => {
  return rankItemList.reduce((acc, rankItem) => acc + rankItem.money * rankItem.winCount, 0);
}

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

  openResultModal(inputNumbers) {
    lottoGame.assignInputNumbers(inputNumbers);
    lottoGame.assignMatchCount();
    const rankItemList = lottoGame.getRankItemList();
    const totalProfit = getTotalProfit(rankItemList);
    const profitRate = getProfitRate(lottoGame.totalCost, totalProfit)
    lottoGameView.openResultModal(rankItemList, getKRString(profitRate));
  },

  closeResultModal() {
    lottoGameView.closeResultModal();
  },
};
