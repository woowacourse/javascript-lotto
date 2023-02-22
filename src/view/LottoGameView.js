import { ConsoleMessage } from '../constants/Constants.js';
import { $, $$ } from '../utils/DomSelector.js';
import { generateUserLottoNumbers } from '../utils/Template.js';
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
    
      callback(event.target['purchase-amount'].value);
      this.addPurchaseInputEvent();
    });
  }

  addPurchaseInputEvent() {
    this.purchaseInput.addEventListener('input', (event) => {
      ViewUtils.hideError(event.target);
    }, { once: true });
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
    ViewUtils.resetInnerHTML(this.userLottoContainer);

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
      this.addWinningNumbersInputEvent();
      this.addBonusNumberInputEvent();
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

  restart() {
    ViewUtils.resetForm(this.purchaseForm);
    ViewUtils.resetForm(this.gameNumbersForm);
    this.startContainer.style.opacity = 0;
    this.startContainer.style.pointerEvents = 'none';
  }
}

export default LottoGameView;
