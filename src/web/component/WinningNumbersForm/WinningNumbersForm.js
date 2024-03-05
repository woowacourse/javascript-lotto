import { $, $$ } from '../../util/domSelector';
import ErrorMessageUtil from '../../util/ErrorMessageUtil';
import Validator from '../../../validator/Validator';
import styles from './WinningNumbersForm.module.css';

class WinningNumbersForm extends HTMLElement {
  #boundHandlePurchaseResult;
  #elements;

  constructor() {
    super();
    this.#boundHandlePurchaseResult = this.#handlePurchaseResult.bind(this);
    this.#elements = { app: $('lotto-game-app') };
  }

  connectedCallback() {
    this.#elements.app.addEventListener('showPurchaseResult', this.#boundHandlePurchaseResult);
  }

  disconnectedCallback() {
    this.#elements.app.removeEventListener('showPurchaseResult', this.#boundHandlePurchaseResult);
  }

  #bindElements() {
    this.#elements = {
      ...this.#elements,
      form: $('#winning-numbers-form', this),
      winningNumbersInputs: $$('.winning-numbers-input', this),
      bonusNumberInput: $('.bonus-number-input', this),
      submitButton: $('#winning-numbers-submit', this),
    };
  }

  #handlePurchaseResult() {
    this.#render();
    this.#bindElements();
    this.#setEvent();
    this.#setInputFocus();
  }

  #handleSubmit() {
    try {
      const winningNumbers = this.#readWinningNumbers();
      const bonusNumber = this.#readBonusNumber(winningNumbers);
      ErrorMessageUtil.removeErrorMessage(this.#elements.form);
      this.#sendWinningCriteria({ winningNumbers, bonusNumber });
    } catch (error) {
      ErrorMessageUtil.showErrorMessage(error.message, this.#elements.form);
    }
  }

  #handleEnterKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.#handleSubmit();
    }
  }

  #setEvent() {
    this.#elements.form.addEventListener('keydown', this.#handleEnterKeyDown.bind(this));
    this.#elements.submitButton.addEventListener('click', this.#handleSubmit.bind(this));
  }

  #setInputFocus() {
    this.#elements.winningNumbersInputs[0].focus();
  }

  #sendWinningCriteria({ winningNumbers, bonusNumber }) {
    this.dispatchEvent(
      new CustomEvent('createWinningResult', {
        detail: { winningNumbers, bonusNumber },
      }),
    );
  }

  #processWinningNumbers() {
    const winningNumbers = [...this.#elements.winningNumbersInputs]
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
    const bonusNumber = this.#elements.bonusNumberInput.value.trim();
    Validator.validateBonusNumber(bonusNumber, winningNumbers);
    return parseInt(bonusNumber, 10);
  }

  #render() {
    this.innerHTML = `
      <section id="winning-numbers" class="${styles['winning-numbers']}">
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
