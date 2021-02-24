import { lottoGame } from '../store.js';
import { getProfitRate } from '../utils/calculate.js';
import { getKRString } from '../utils/format.js';
import lottoGameView from './view.js';
import { LOTTO } from '../constants.js';

const getTotalProfit = (rankItemList) => {
  return rankItemList.reduce(
    (acc, rankItem) => acc + rankItem.money * rankItem.winCount,
    0
  );
};

const service = {
  purchaseLottoItems(cost) {
    const lottoItemCount = cost / LOTTO.PRICE;
    lottoGame.initLottoItemList();
    lottoGame.addLottoItems(lottoItemCount);
    lottoGameView.displayResult(lottoGame.lottoItemList);
  },

  toggleLottoItemNumbers(checked) {
    checked 
      ? lottoGameView.displayLottoNumbers() 
      : lottoGameView.hideLottoNumbers();
  },

  initToggleButton() {
    lottoGameView.resetToggleButton();
  },

  showWinningResult(inputNumbers) {
    lottoGame.assignInputNumbers(inputNumbers);
    lottoGame.assignMatchCount();
    const rankItemList = lottoGame.getRankItemList();
    const profitRate = getProfitRate(lottoGame.totalCost, getTotalProfit(rankItemList));
    lottoGameView.openResultModal(rankItemList, getKRString(profitRate));
  },

  hideWinningResult() {
    lottoGameView.closeResultModal();
  },

  restart() {
    lottoGame.init();
    lottoGameView.init();
  },

  guideUserInput(message, callback) {
    lottoGameView.showMessage(message);
    callback && callback();
  },
};

export default service;
