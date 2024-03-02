import CONFIG from '../constants/config.js';
import PRIZE from '../constants/prize.js';
import LotteryMachine from '../domain/services/LotteryMachine.js';
import lottoService from '../domain/services/lottoService.js';
import dom from '../utils/dom.js';
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
  }

  #showPurchaseLottoResult(lottery) {
    const lottoCount = this.#purchaseAmount / CONFIG.PURCHASE_UNIT;
    webOutputView.printLottoCount(lottoCount);
    webOutputView.printLottery(lottery);
  }

  #processLottoResult(matchedResultList) {
    const rankList = lottoService.calculateRankCounts(matchedResultList);

    webOutputView.printLottoResult(
      { createLottoResultTitle: this.createLottoResultTitle, createLottoResultTable: this.createLottoResultTable },
      rankList,
    );
  }

  #processProfit(matchedResultList) {
    const profit = lottoService.calculateProfit(matchedResultList, this.#purchaseAmount);
    webOutputView.printProfit(profit);
  }

  handleLottoResult = (winningNumbers, bonusNumber) => {
    const matchedResultList = this.#lottery.map(lotto => lotto.getMatchedAmount(winningNumbers, bonusNumber));
    this.#processLottoResult(matchedResultList);
    this.#processProfit(matchedResultList);
  };

  createLottoResultTitle() {
    const lottoResultRowTitle = document.createElement('div');
    lottoResultRowTitle.classList.add('lotto-result-row');
    lottoResultRowTitle.classList.add('table-title');
    PRIZE.TABLE_TITLE_LIST.forEach(text => {
      const lottoTableTitle = dom.create('div', null, 'lotto-result-cell', text);
      lottoResultRowTitle.appendChild(lottoTableTitle);
    });
    return lottoResultRowTitle;
  }

  createLottoResultTable(ranks) {
    const resultTableFragment = document.createDocumentFragment();
    [PRIZE.FIFTH, PRIZE.FORTH, PRIZE.THIRD, PRIZE.SECOND, PRIZE.FIRST].forEach(rank => {
      const lottoResultRow = dom.create('div', null, 'lotto-result-row');
      const lottoMatchedCount = dom.create('div', null, 'lotto-result-cell', `${PRIZE.COUNT_OUTPUTS[rank]}`);
      const lottoResultPrize = dom.create('div', null, 'lotto-result-cell', `${PRIZE.AMOUNT[rank].toLocaleString()}`);
      const lottoRankCount = dom.create('div', null, 'lotto-result-cell', `${ranks[rank]}개`);
      lottoResultRow.appendChild(lottoMatchedCount);
      lottoResultRow.appendChild(lottoResultPrize);
      lottoResultRow.appendChild(lottoRankCount);
      resultTableFragment.appendChild(lottoResultRow);
    });
    return resultTableFragment;
  }
}

export default WebLottoController;
