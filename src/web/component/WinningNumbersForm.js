import { $, $$ } from '../util/domSelector';
import Validator from '../../validator/Validator';

class WinningNumbersForm extends HTMLElement {
  #boundMethods;

  constructor() {
    super();
    this.#boundMethods = {
      handlePurchaseResult: this.#handlePurchaseResult.bind(this),
      handleSubmit: this.#handleSubmit.bind(this),
    };
  }

  connectedCallback() {
    $('lotto-game-app').addEventListener('showPurchaseResult', this.#boundMethods.handlePurchaseResult);
  }

  disconnectedCallback() {
    $('lotto-game-app').removeEventListener('showPurchaseResult', this.#boundMethods.handlePurchaseResult);
  }

  #handlePurchaseResult() {
    this.#render();
    $('#winning-numbers-submit', this).addEventListener('click', this.#boundMethods.handleSubmit);
  }

  #handleSubmit() {
    try {
      const winningNumbers = this.#readWinningNumbers();
      const bonusNumber = this.#readBonusNumber(winningNumbers);
      this.#removeErrorMessage($('#winning-numbers-form'));
      this.#sendWinningCriteria({ winningNumbers, bonusNumber });
    } catch (error) {
      this.#showErrorMessage(error.message, $('#winning-numbers-form'));
    }
  }

  #sendWinningCriteria({ winningNumbers, bonusNumber }) {
    this.dispatchEvent(
      new CustomEvent('createWinningResult', {
        detail: { winningNumbers, bonusNumber },
      }),
    );
  }

  #processWinningNumbers() {
    const winningNumbers = [...$$('.winning-numbers-input')]
      .map((numberInput) => numberInput.value)
      .filter((number) => number !== '');
    return winningNumbers;
  }

  #readWinningNumbers() {
    const winningNumbers = this.#processWinningNumbers();
    Validator.validateWinningNumbers(winningNumbers.join(','));
    return winningNumbers.map((number) => parseInt(number.trim(), 10));
  }

  #readBonusNumber(winningNumbers) {
    const bonusNumber = $('.bonus-number-input').value.trim();
    Validator.validateBonusNumber(bonusNumber, winningNumbers);
    return parseInt(bonusNumber, 10);
  }

  #showErrorMessage(message, target) {
    const errorMessageElement = $('.error-text', target);
    if (errorMessageElement) {
      errorMessageElement.textContent = message;
      return;
    }
    const messageElement = `<p class='error-text'>${message}</p>`;
    target.insertAdjacentHTML('beforeend', messageElement);
  }

  #removeErrorMessage(target) {
    const errorMessageElement = $('.error-text', target);
    errorMessageElement?.remove();
  }

  #render() {
    this.innerHTML = `
      <section id="winning-numbers">
        <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
        <form id="winning-numbers-form">
          <winning-numbers-input></winning-numbers-input>
          <bonus-number-input></bonus-number-input>
        </form>
        <button type="button" id="winning-numbers-submit">결과 확인하기</button>
      </section>
    `;
  }
}

customElements.define('winning-numbers-form', WinningNumbersForm);
