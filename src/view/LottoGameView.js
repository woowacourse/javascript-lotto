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
    this.closeIcon = $('.close-icon');
    this.restartButton = $('#restart-button');

    this.addPurchaseInputEvent();
    this.addWinningNumbersInputEvent();
    this.addBonusNNumbersInputEvent();
    this.addCloseClickEvent();
    this.addModalBackdropClickEvent();
    this.addRestartButtonClickEvent();
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
    this.userLottoContainer.innerHTML = '';

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

  addWinningNumbersInputEvent() {
    this.winningNumbersInputs.forEach((input) => {
      input.addEventListener('input', () => {
        input.classList.remove('error-input');
        this.hideErrorMessage('game-numbers');
      });
    });
  }

  addBonusNNumbersInputEvent() {
    this.bonusNumberInput.addEventListener('input', (event) => {
      event.target.classList.remove('error-input');
      this.hideErrorMessage('game-numbers');
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

  addCloseClickEvent() {
    this.closeIcon.addEventListener('click', this.closeResultModal.bind(this));
  }

  addModalBackdropClickEvent() {
    this.resultModal.addEventListener('click', this.closeResultModal.bind(this));
  }

  closeResultModal(event) {
    event.stopPropagation();
    this.resultModal.style.display = 'none';
  }

  addRestartButtonClickEvent() {
    this.restartButton.addEventListener('click', this.restartGame.bind(this));
  }

  restartGame(event) {
    event.stopPropagation();
    this.purchaseForm.reset();
    this.startContainer.style.opacity = 0;
    this.startContainer.style.pointerEvents = 'none';
    this.winningNumbersForm.reset();
    this.resultModal.style.display = 'none';
  }
}

export default LottoGameView;
