import { ConsoleMessage } from '../constants/Constants.js';
import $ from '../utils/DomSelector.js';
import { generateUserLottoNumbers } from '../utils/Template.js';

class LottoGameView {
  constructor() {
    this.#initDom();
  }

  #initDom() {
    this.purchaseForm = $('#purchase-form');
    this.purchaseInput = $('#purchase-input');
    this.userLottos = $('.user-lottos');
    this.userLottoPurchaseCount = $('#user-lotto-purchase');
    this.userLottoContainer = $('.user-lotto-container');
    this.winningNumbersForm = $('.winning-numbers-container');
    this.winningNumbersInput = $('.input--number');
    this.bonusNumberInput = $('input[name="bonus-number"]');

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

  showUserLottos(purchaseCount, userLottoList) {
    this.showUserLottoPurchaseCount(purchaseCount);
    this.showUserLottoList(userLottoList);
    this.showWinningNumbersForm();
  }

  showUserLottoPurchaseCount(count) {
    this.userLottoPurchaseCount.textContent = ConsoleMessage.purchaseCount(count);
  }

  showUserLottoList(lottoList) {
    lottoList.forEach((numbers) => {
      this.userLottoContainer.insertAdjacentHTML('beforeend', generateUserLottoNumbers(numbers));
    });
  }

  showWinningNumbersForm() {
    this.winningNumbersForm.style.opacity = 1;
    this.winningNumbersForm.style.pointerEvents = 'all';
  }

  addWinningNumbersSubmitEvent(callback) {
    this.winningNumbersForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const winningNumbers = [...document.querySelectorAll('input[name="winning-number"]')].map(
        (element) => Number(element.value)
      );
      const bonusNumber = document.querySelector('input[name="bonus-number"]').value;

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
}

export default LottoGameView;
