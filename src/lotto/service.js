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
    lottoGameView.showPurchaseResult(lottoGame.LottoItemList);
  },

  toggleLottoItemNumbers(checked) {
    if (checked) {
      lottoGameView.showLottoNumbers();
      return;
    }
    lottoGameView.hideLottoNumbers();
  },

  initToggleButton() {
    lottoGameView.initToggleButton();
  },

  showWinningResult(inputNumbers) {
    lottoGame.assignInputNumbers(inputNumbers);
    lottoGame.assignMatchCount();
    const rankItemList = lottoGame.getRankItemList();
    const profitRate = getProfitRate(lottoGame.TotalCost, getTotalProfit(rankItemList));
    lottoGameView.showResultModal(rankItemList, getKRString(profitRate));
  },

  hideWinningResult() {
    lottoGameView.hideResultModal();
  },

  restart() {
    lottoGame.initGame();
    lottoGameView.initLottoGame();
  },

  guideUserInput(message, callback) {
    lottoGameView.showMessage(message);
    callback && callback();
  },
};

export default service;
