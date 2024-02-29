import { $, $$ } from '../../util/domSelector';
import Validator from '../../validator/Validator';

class WinningNumbersForm extends HTMLElement {
  #winningNumbers;
  #bonusNumber;

  connectedCallback() {
    $('lotto-game-app').addEventListener('purchaseResult', this.#render.bind(this));
    $('lotto-game-app').addEventListener('purchaseResult', this.#addFormEvent.bind(this));
  }

  #addFormEvent() {
    $('#winning-numbers-submit').addEventListener('click', this.#handleSubmit.bind(this));
  }

  #handleSubmit() {
    this.#winningNumbers = this.#readWinningNumbers();
    if (this.#winningNumbers) {
      this.#bonusNumber = this.#readBonusNumber(this.#winningNumbers);
    }
    if (this.#winningNumbers && this.#bonusNumber) {
      this.#removeErrorMessage($('#winning-numbers-form'));
      this.#sendWinningCreteria({ winningNumbers: [...this.#winningNumbers], bonusNumber: this.#bonusNumber });
    }
  }

  #sendWinningCreteria({ winningNumbers, bonusNumber }) {
    this.dispatchEvent(
      new CustomEvent('winningCriteria', {
        detail: { winningNumbers, bonusNumber },
      }),
    );
  }

  #readWinningNumbers() {
    try {
      const winningNumbers = this.#processWinningNumbers();
      Validator.validateWinningNumbers(winningNumbers.join(','));
      return winningNumbers.map((number) => parseInt(number.trim(), 10));
    } catch (error) {
      this.#showErrorMessage(error.message, $('#winning-numbers-form'));
      return null;
    }
  }

  #processWinningNumbers() {
    const winningNumbers = [...$$('.winning-numbers-input')]
      .map((numberInput) => numberInput.value)
      .filter((number) => number !== '');
    return winningNumbers;
  }

  #readBonusNumber(winningNumbers) {
    try {
      const bonusNumber = $('.bonus-number-input').value;
      Validator.validateBonusNumber(bonusNumber, winningNumbers);
      return parseInt(bonusNumber, 10);
    } catch (error) {
      this.#showErrorMessage(error.message, $('#winning-numbers-form'));
      return null;
    }
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
