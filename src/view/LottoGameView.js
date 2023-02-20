import { ConsoleMessage } from '../constants/Constants.js';
import { $, $$ } from '../utils/DomSelector.js';
import { generateUserLottoNumbers } from '../utils/Template.js';

class LottoGameView {
  constructor() {
    this.#initDom();
  }

  #initDom() {
    this.purchaseForm = $('#purchase-form');
    this.purchaseInput = $('#purchase-input');
    this.startContainer = $('.start-container');
    this.userLottoPurchaseCount = $('#user-lotto-purchase');
    this.userLottoContainer = $('.user-lotto-container');
    this.winningNumbersForm = $('#winning-numbers-form');
    this.winningNumbersInputs = $$('input[name="winning-number"]');
    this.bonusNumberInput = $('input[name="bonus-number"]');
    this.resultModal = $('.result-container');
    this.profitRate = $('#profit-rate');

    this.addPurchaseInputEvent();
  }

  addPurchaseSubmitEvent(callback) {
    this.purchaseForm.addEventListener('submit', (event) => {
      event.preventDefault();
      callback(event.target['purchase-amount'].value);
    });
  }

  addPurchaseInputEvent() {
    this.purchaseInput.addEventListener('input', () => {
      this.purchaseInput.classList.remove('error-input');
      this.hideErrorMessage('purchase');
    });
  }

  showStartContainer() {
    this.startContainer.style.opacity = 1;
    this.startContainer.style.pointerEvents = 'all';
  }

  showUserLottos(purchaseCount, userLottoList) {
    this.showUserLottoPurchaseCount(purchaseCount);
    this.showUserLottoList(userLottoList);
  }

  showUserLottoPurchaseCount(count) {
    this.userLottoPurchaseCount.textContent = ConsoleMessage.purchaseCount(count);
  }

  showUserLottoList(lottoList) {
    lottoList.forEach((numbers) => {
      this.userLottoContainer.insertAdjacentHTML('beforeend', generateUserLottoNumbers(numbers));
    });
  }

  addGameNumbersSubmitEvent(callback) {
    this.winningNumbersForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const winningNumbers = [...this.winningNumbersInputs].map((element) => Number(element.value));
      const bonusNumber = Number(this.bonusNumberInput.value);

      callback(winningNumbers, bonusNumber);
    });
  }

  showErrorMessage(element, message) {
    const domElement = $(`#${element}-error`);
    domElement.textContent = message;
    domElement.style.opacity = 1;
  }

  hideErrorMessage(element) {
    const domElement = $(`#${element}-error`);
    domElement.textContent = '';
    domElement.style.opacity = 0;
  }

  showResultModal() {
    this.resultModal.style.display = 'flex';
  }

  showRanks(ranks) {
    document.querySelectorAll('.match-count').forEach((element) => {
      element.textContent = `${ranks[element.dataset.index]}개`;
    });
  }

  showProfitRate(profitRate) {
    this.profitRate.textContent = ConsoleMessage.profitRateResult(profitRate);
  }
}

export default LottoGameView;
