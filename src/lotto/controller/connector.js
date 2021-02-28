import { lottoGame } from '../../store.js';
import { getProfitRate } from '../../utils/calculate.js';
import { getKRMoneyString } from '../../utils/format.js';
import lottoGameView from '../view/view.js';
import { GAME } from '../../constants.js';


const service = {
  purchaseLottoItems() {
    lottoGame.addLottoItems(lottoGame.getAffordableLottoItemCount());
    lottoGame.spendDeposit();
    lottoGameView.showPurchaseResult(lottoGame.LottoItemList);
    lottoGameView.showDeposit(lottoGame.Deposit);
  },

  depositMoney(cost) {
    lottoGame.saveDeposit(cost);
    lottoGameView.showDeposit(lottoGame.Deposit);
  },

  toggleLottoItemNumbers(checked) {
    if (checked) {
      lottoGameView.showLottoNumbers();
      return;
    }
    lottoGameView.hideLottoNumbers();
  },

  showWinningResult(inputNumbers) {
    lottoGame.assignInputNumbers(inputNumbers);
    lottoGame.assignMatchCount();
    const rankItemList = lottoGame.getRankItemList();
    const profitRate = getProfitRate(lottoGame.TotalCost, lottoGame.getTotalProfit(rankItemList));
    lottoGameView.showResultModal(rankItemList, getKRMoneyString(profitRate));
  },

  restart() {
    lottoGame.initGame();
    lottoGameView.initLottoGame(GAME.INITIAL_DEPOSIT);
  },

  guideUserInput(message, callback) {
    lottoGameView.showMessage(message);
    callback && callback();
  },
};

export default service;
