import { lottoGame } from '../../store.js';
import { getProfitRate } from '../../utils/calculate.js';
import { getKRMoneyString } from '../../utils/format.js';
import lottoGameView from '../view/view.js';
import { GAME, LOTTO } from '../../constants.js';

const service = {
  purchaseLottoItems() {
    lottoGame.addLottoItems(lottoGame.getAffordableLottoItemCount());
    lottoGame.spendDeposit();
    lottoGameView.showPurchaseResult(lottoGame.LottoItemList);
    lottoGameView.showDeposit(lottoGame.Deposit);
  },

  depositMoney(cost) {
    if (Number.isNaN(cost)) return;

    lottoGame.saveDeposit(cost);
    lottoGameView.showDeposit(getKRMoneyString(lottoGame.Deposit));
  },

  toggleLottoItemNumbers(checked) {
    if (checked) {
      lottoGameView.showLottoNumbers();
      return;
    }
    lottoGameView.hideLottoNumbers();
  },

  showWinningResult(inputNumbers) {
    if (!Array.isArray(inputNumbers) || inputNumbers.length !== LOTTO.CORRECT_NUMBER_LENGTH) return;
    
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
    if (typeof message !== 'string' || message === '') return;
    lottoGameView.showMessage(message);
    callback && callback();
  },
};

export default service;
