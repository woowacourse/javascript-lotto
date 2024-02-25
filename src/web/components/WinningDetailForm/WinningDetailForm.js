import Lotto from '../../../domain/Lotto/Lotto.js';
import BaseComponent from '../BaseComponent/BaseComponent.js';
import styles from './WinningDetailForm.module.css';
import WinningResultService from '../../../service/WinningResultService.js';
import AppError from '../../../errors/AppError/AppError.js';
import { showErrorMessage } from '../../utils/showErrorMessage.js';
import { BonusNumberValidator, WinningNumberValidator } from '../../../validator/index.js';

const { LOTTO_RULE } = Lotto;

class WinningDetailForm extends BaseComponent {
  setEvent() {
    this.on(
      { target: document, eventName: 'buyLottoPrice' },
      this.#handleRenderLottoNumbers.bind(this),
    );

    this.on(
      { target: this.querySelector('#winning-detail-form'), eventName: 'submit' },
      this.#handleSubmit.bind(this),
    );
  }

  #handleRenderLottoNumbers() {
    this.classList.remove('close');

    this.#initWinningDetailInputs();

    this.#focusFirstWinningNumberInput();
  }

  #initWinningDetailInputs() {
    this.querySelectorAll('.winning-number').forEach((winningNumberInputElement) => {
      winningNumberInputElement.value = '';
    });

    this.querySelector('.bonus-number').value = '';
  }

  #focusFirstWinningNumberInput() {
    const winningNumberInputElementList = this.querySelectorAll('.winning-number');

    if (
      winningNumberInputElementList &&
      winningNumberInputElementList[0] instanceof HTMLInputElement
    ) {
      winningNumberInputElementList[0].focus();
    }
  }

  #handleSubmit(event) {
    try {
      event.preventDefault();

      const { winningNumber, bonusNumber } = this.#createWinningDetail();
      WinningNumberValidator.checkWinningNumber(winningNumber);
      BonusNumberValidator.checkBonusNumber(bonusNumber, winningNumber);

      this.#removeErrorMessage();

      const params = this.#createWinningResultParams({ winningNumber, bonusNumber });
      const { winningRankResult, rateOfReturn } = WinningResultService.createWinningResult(params);

      this.emit('openModal', { winningRankResult, rateOfReturn });
    } catch (error) {
      if (error instanceof AppError) {
        const nonPrefixErrorMessage = error.message.replace('[ERROR]', '');
        showErrorMessage(nonPrefixErrorMessage, '#winning-detail-form');
      }
    }
  }

  #removeErrorMessage() {
    const errorMessageElement = this.querySelector('.error-message');

    if (errorMessageElement) errorMessageElement.remove();
  }

  #createWinningDetail() {
    const winningNumber = Array.from(this.querySelectorAll('.winning-number'), (input) =>
      Number(input.value),
    ).filter((number) => number !== 0);
    const bonusNumber = Number(this.querySelector('.bonus-number')?.value);

    return { winningNumber, bonusNumber };
  }

  #createWinningResultParams({ winningNumber, bonusNumber }) {
    const { buyLottoPrice, lottoNumbers } = document
      .querySelector('purchased-lotto-section')
      .getBuyLottoDetails();

    return { winningNumber, bonusNumber, buyLottoPrice, lottoNumbers };
  }

  render() {
    this.innerHTML = `
        <form id="winning-detail-form" class="${styles.winningDetailForm}">
          <p class="body">지난 주 당첨번호 ${
            LOTTO_RULE.count
          }개와 보너스 번호 1개를 입력해주세요.</p>
          <div class="${styles.numbersInputContainer}">
            <div>
              <label for="winning-number-input-1" class="body">당첨 번호</label>
              <div class=${styles.winningNumberInputContainer}>
                ${this.#createNumberInputByCount(LOTTO_RULE.count)}
              </div>
            </div>
            <div class=${styles.bonusNumberContainer}>
              <label for="bonus-number-input" class="body">보너스 번호</label>
              ${this.#createNumberInputByCount(1, { isBonusNumber: true })}
            </div>
          </div>
          <button type="submit" class="${styles.submitButton} caption">결과 확인하기</button>
        </form>
      `;
  }

  #createNumberInputByCount(count, { isBonusNumber } = { isBonusNumber: false }) {
    if (!isBonusNumber) {
      return Array.from({ length: count }, (_, index) => {
        const id = `winning-number-input-${index + 1}`;

        return `<input id="${id}" type="number" class="${styles.numberInput} winning-number"/>`;
      }).join('');
    }

    return `<input id="bonus-number-input" type="number" class="${styles.numberInput} bonus-number"/>`;
  }
}

customElements.define('winning-detail-form', WinningDetailForm);
