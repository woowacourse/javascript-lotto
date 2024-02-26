import CONFIG from '../constants/config.js';
import LotteryMachine from '../domain/services/LotteryMachine.js';
import lottoService from '../domain/services/lottoService.js';
import webInputView from '../views/webInputView.js';
import webOutputView from '../views/webOutputView.js';

class WebLottoController {
  #purchaseAmount;
  #lottery;

  constructor(purchaseAmount) {
    this.#purchaseAmount = purchaseAmount;
  }

  async run() {
    this.#lottery = new LotteryMachine(this.#purchaseAmount).makeLottery();
    this.#showPurchaseLottoResult(this.#lottery);
    const $lottoResultButton = document.getElementById('lottoResultButton');
    $lottoResultButton.addEventListener('click', this.handleLottoResult);
  }

  #showPurchaseLottoResult(lottery) {
    const lottoCount = this.#purchaseAmount / CONFIG.PURCHASE_UNIT;
    webOutputView.printLottoCount(lottoCount);
    webOutputView.printLottery(lottery);
  }

  #processLottoResult(matchedResultList) {
    const rankList = lottoService.calculateRankCounts(matchedResultList);
    webOutputView.printLottoResult(rankList);
  }

  #processProfit(matchedResultList) {
    const profit = lottoService.calculateProfit(matchedResultList, this.#purchaseAmount);
    webOutputView.printProfit(profit);
  }

  handleLottoResult = () => {
    const winningNumbers = webInputView.readWinningNumbers();
    if (!winningNumbers) return;
    const bonusNumber = webInputView.readBonusNumber(winningNumbers);
    if (!bonusNumber) return;
    const matchedResultList = this.#lottery.map(lotto => lotto.getMatchedAmount(winningNumbers, bonusNumber));
    this.#processLottoResult(matchedResultList);
    this.#processProfit(matchedResultList);
  };
}

export default WebLottoController;
