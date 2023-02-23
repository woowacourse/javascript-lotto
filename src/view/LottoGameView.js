import { Message } from '../constants/Constants.js';
import { $, $$ } from '../utils/DomSelector.js';
import generateUserLottoNumbersElement from '../utils/Template.js';
import ViewUtils from '../utils/ViewUtils.js';

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
  }

  addPurchaseSubmitEvent(callback) {
    this.purchaseForm.addEventListener('submit', (event) => {
      event.preventDefault();
      callback(this.purchaseInput.value);
    });
  }

  addPurchaseInputEvent() {
    this.purchaseInput.addEventListener('input', (event) => {
      ViewUtils.hideError(event.target);
    }, { once: true });
  }

  showStartContainer() {
    this.startContainer.classList.add('display');
  }

  showUserLottos(purchaseCount, userLottoList) {
    this.showUserLottoPurchaseCount(purchaseCount);
    this.showUserLottoList(userLottoList);
  }

  showUserLottoPurchaseCount(count) {
    this.userLottoPurchaseCount.textContent = Message.purchaseCount(count);
  }

  showUserLottoList(lottoList) {
    ViewUtils.resetInnerHTML(this.userLottoContainer);

    lottoList.forEach((numbers) => {
      this.userLottoContainer.insertAdjacentHTML(
        'beforeend',
        generateUserLottoNumbersElement(numbers)
      );
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
      input.addEventListener('input', () => {
        ViewUtils.hideError(this.winningNumbersInputs[0]);
      }, { once: true });
    });
  }

  addBonusNumberInputEvent() {
    this.bonusNumberInput.addEventListener('input', (event) => {
      ViewUtils.hideError(event.target);
    }, { once: true });
  }

  renderPurchaseError(message) {
    ViewUtils.resetInput(this.purchaseInput);
    ViewUtils.focusElement(this.purchaseInput);
    ViewUtils.showError(this.purchaseInput, message);
  }

  renderWinningNumbersError(message) {
    ViewUtils.resetForm(this.gameNumbersForm);
    ViewUtils.focusElement(this.winningNumbersInputs[0]);
    ViewUtils.showError(this.winningNumbersInputs[0], message);
  }

  renderBonusNumberError(message) {
    ViewUtils.resetInput(this.bonusNumberInput);
    ViewUtils.focusElement(this.bonusNumberInput);
    ViewUtils.showError(this.bonusNumberInput, message);
  }

  reset() {
    ViewUtils.resetForm(this.purchaseForm);
    ViewUtils.resetForm(this.gameNumbersForm);
    this.startContainer.classList.remove('display');
  }
}

export default LottoGameView;
