import { purchaseResult, purchasedLottoList } from './DOM/objects';
import { CONFIG_FORMAT, CONFIG_LOTTO } from '../constants/config';
import LotteryMachine from '../domain/services/LotteryMachine';
import WebInputView from './views/WebInputView';
import WebOutputView from './views/WebOutputView';
import lottoService from '../domain/services/lottoService';
import { $ } from '../utils/querySelector';

class WebLottoController {
  #purchaseAmount;
  #lottery;

  constructor() {
    this.showLottoResult = this.showLottoResult.bind(this);
  }

  run() {
    this.initApp();
    this.#getPurchaseAmount();
  }

  initApp() {
    const purchaseAmountInput = $('#purchase-amount-input');
    const winningNumbersForm = $('#winning-numbers-form');
    const lottoResultModalSection = $('#lotto-result-modal-section');

    purchaseAmountInput.value = '';
    purchaseAmountInput.focus();
    WebOutputView.reset(purchaseResult);
    WebOutputView.reset(purchasedLottoList);
    WebOutputView.reset(winningNumbersForm);
    lottoResultModalSection.classList.add('hide');
  }

  #getPurchaseAmount() {
    const purchaseAmountForm = $('#purchase-amount-form');
    purchaseAmountForm.addEventListener('submit', e => {
      const purchaseAmount = WebInputView.readPurchaseAmount(e);
      if (!purchaseAmount) return;
      this.#purchaseAmount = purchaseAmount;
      this.#lottery = new LotteryMachine(this.#purchaseAmount).makeLottery();
      this.#showPurchasedResult(this.#purchaseAmount);
    });
  }

  #showPurchasedResult(amount) {
    const lottoCount = amount / CONFIG_LOTTO.PURCHASE_UNIT;
    const message = `총 ${lottoCount}개를 구매하였습니다.`;
    WebOutputView.printMessage(purchaseResult, message);

    const lottoList = this.#lottery.map(lotto => {
      return `<li><span>🎟️</span>${lotto.numberList.join(CONFIG_FORMAT.JOIN_SEPARATOR)}</li>`;
    });
    WebOutputView.printMessage(purchasedLottoList, lottoList.join(''));
    WebOutputView.renderWinningNumbersForm();
    this.#manageFormEvents();
  }

  #manageFormEvents() {
    const winningNumbersForm = $('#winning-numbers-form');
    winningNumbersForm.addEventListener('submit', this.showLottoResult);
  }

  showLottoResult(event) {
    const winningNumbersAndBonus = WebInputView.readWinningAndBonusNumbers(event);
    if (winningNumbersAndBonus) {
      const { winningNumbers, bonusNumber } = winningNumbersAndBonus;
      const matchedResultList = this.#lottery.map(lotto => lotto.getMatchedAmount(winningNumbers, bonusNumber));
      const rankList = lottoService.calculateRankCounts(matchedResultList);
      const profit = lottoService.calculateProfit(matchedResultList, this.#purchaseAmount);
      this.#openResultModal(rankList, profit);
    }
  }

  #openResultModal(rankList, profit) {
    WebOutputView.renderLottoResult(rankList, profit);
    WebOutputView.openModal();
    this.#manageModalEvents();
  }

  #manageModalEvents() {
    const modalBackdrop = $('#lotto-result-modal-overlay');
    const modalContainer = $('#lotto-result-modal-container');
    const modalCloseButton = $('#modal-close-button');
    const restartButton = $('#lotto-result-restart-button');

    modalContainer.addEventListener('click', e => e.stopPropagation());
    modalBackdrop.addEventListener('click', () => WebOutputView.closeModal());
    modalCloseButton.addEventListener('click', () => WebOutputView.closeModal());
    restartButton.addEventListener('click', () => {
      WebOutputView.closeModal();
      this.run();
    });
  }
}

export default WebLottoController;
