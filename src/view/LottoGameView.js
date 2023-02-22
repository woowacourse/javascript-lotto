import { ConsoleMessage } from '../constants/Constants.js';
import { $, $$ } from '../utils/DomSelector.js';
import { generateUserLottoNumbers } from '../utils/Template.js';

class LottoGameView {
  constructor() {
    this.#initDom();
  }

  #initDom() {
    this.purchaseForm = $('#purchase-form');
    this.purchaseInput = $('.purchase-input');
    this.startContainer = $('.start-container');
    this.userLottoPurchaseCount = $('#user-lotto-purchase');
    this.userLottoContainer = $('.user-lotto-container');
    this.gameNumbersForm = $('#game-numbers-form');
    this.winningNumbersInputs = $$('input[name="winning-number"]');
    this.bonusNumberInput = $('input[name="bonus-number"]');

    this.addPurchaseInputEvent();
    this.addWinningNumbersInputEvent();
    this.addBonusNNumbersInputEvent();
  }

  addPurchaseSubmitEvent(callback) {
    this.purchaseForm.addEventListener('submit', (event) => {
      event.preventDefault();
      callback(event.target['purchase-amount'].value);
    });
  }

  addPurchaseInputEvent() {
    this.purchaseInput.addEventListener('input', this.hideError.bind(this));
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
    this.resetInnerHTML(this.userLottoContainer);

    lottoList.forEach((numbers) => {
      this.userLottoContainer.insertAdjacentHTML('beforeend', generateUserLottoNumbers(numbers));
    });
  }

  addGameNumbersSubmitEvent(callback) {
    this.gameNumbersForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const winningNumbers = [...this.winningNumbersInputs].map((element) => Number(element.value));
      const bonusNumber = Number(this.bonusNumberInput.value);

      callback(winningNumbers, bonusNumber);
    });
  }

  addWinningNumbersInputEvent() {
    this.winningNumbersInputs.forEach((input) => {
      input.addEventListener('input', this.hideError.bind(this));
    });
  }

  addBonusNNumbersInputEvent() {
    this.bonusNumberInput.addEventListener('input', this.hideError.bind(this));
  }

  restart() {
    this.resetForm(this.purchaseForm);
    this.resetForm(this.gameNumbersForm);
    this.startContainer.style.opacity = 0;
    this.startContainer.style.pointerEvents = 'none';
  }

  showError(element, message) {
    element.classList.add('error-input');
    this.showErrorMessage(element.classList[0], message);
  }

  hideError(event) {
    event.target.classList.remove('error-input');
    this.hideErrorMessage(event.target.classList[0]);
  }

  showErrorMessage(name, message) {
    const domElement = $(`#${name}-error`);
    domElement.textContent = message;
    domElement.style.opacity = 1;
  }

  hideErrorMessage(name) {
    const domElement = $(`#${name}-error`);
    domElement.textContent = '';
    domElement.style.opacity = 0;
  }

  resetInput(element) {
    element.value = '';
    element.focus();
  }

  resetForm(element) {
    element.reset();
  }

  resetInnerHTML(element) {
    element.innerHTML = '';
  }
}

export default LottoGameView;
