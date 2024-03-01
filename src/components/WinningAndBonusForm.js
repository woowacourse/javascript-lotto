import './WinningAndBonusForm.css';
import './WinningNumbersInputField.js';
import './BonusNumberInputField.js';
import { BonusNumberValidator, WinningNumbersValidator } from '../validator/index.js';

const WINNING_NUMBERS_FORM = `
<div class="winning-and-bonus-container">
    <div class="winning-and-bonus-title-container">
      <p class="lotto-body">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
    </div>
    
    <div class="winning-and-bonus-input-container">
      <winning-numbers-input-field></winning-numbers-input-field>
      <bonus-number-input-field></bonus-number-input-field>
    </div>
    <div class="error-message"></div>
  </div>
<lotto-button id="result-button"></lotto-button>
`;

class WinningNumbersForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.#setEventListener();
    this.#setInputListener();
    this.#setEnterListener();
  }

  render() {
    this.innerHTML = WINNING_NUMBERS_FORM;
  }

  #setEventListener() {
    const purchaseButton = document.querySelector('#result-button');

    purchaseButton.addEventListener('click', () => {
      this.#resultHandler();
    });
  }

  #setInputListener() {
    this.addEventListener('input', () => {
      const button = this.querySelector('#result-button');
      button.setIsDisabled(!this.#isAllFilled());
    });
  }

  #setEnterListener() {
    const button = this.querySelector('#result-button');
    this.addEventListener('keyup', (event) => {
      if (event.key === 'Enter' && !button.getIsDisabled()) {
        this.#resultHandler();
      } else if (event.key === 'Enter') {
        this.#focusNextInput();
      }
    });
  }

  #resultHandler() {
    const winningNumbers = this.querySelector('winning-numbers-input-field').getValue();
    const bonusNumber = this.querySelector('bonus-number-input-field').getValue();
    this.#errorHandler({ winningNumbers, bonusNumber });
    document.activeElement.blur();
  }

  #focusNextInput() {
    const activeElement = document.activeElement;
    const focusableElements = Array.from(document.querySelectorAll('input'));
    const currentIndex = focusableElements.indexOf(activeElement);

    if (currentIndex !== -1 && currentIndex < focusableElements.length - 1) {
      const nextElement = focusableElements[currentIndex + 1];
      nextElement.focus();
    }
  }

  #isAllFilled() {
    const winningNumbersInput = this.querySelector('winning-numbers-input-field').getValue();
    const bonusNumberInput = this.querySelector('bonus-number-input-field').getValue();
    const hasEmptyWinningNumber = winningNumbersInput.includes(0);

    return !hasEmptyWinningNumber && bonusNumberInput !== 0;
  }

  #lottoResultEvent({ winningNumbers, bonusNumber }) {
    const app = document.querySelector('lotto-app');
    app.controller().processLottoResult({ winningNumbers, bonusNumber });

    const lottoResultEvent = new CustomEvent('lottoResult', {
      bubbles: true,
    });
    this.dispatchEvent(lottoResultEvent);
  }

  setErrorMessage(error) {
    this.querySelector('.error-message').textContent = error.message;
  }

  #errorHandler({ winningNumbers, bonusNumber }) {
    try {
      WinningNumbersValidator.check(winningNumbers.join(','));
      BonusNumberValidator.check(`${bonusNumber}`, winningNumbers);

      this.#lottoResultEvent({ winningNumbers, bonusNumber });
    } catch (error) {
      this.setErrorMessage(error);
    }
  }
}

customElements.define('winning-and-bonus-form', WinningNumbersForm);
