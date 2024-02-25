import BaseComponent from '../BaseComponent/BaseComponent.js';

import styles from './WinningDetailForm.module.css';

import Lotto from '../../../domain/Lotto/Lotto.js';

import WinningResultService from '../../../service/WinningResultService.js';

import AppError from '../../../errors/AppError/AppError.js';

import { BonusNumberValidator, WinningNumberValidator } from '../../../validator/index.js';

import { removeErrorMessage, showErrorMessage } from '../../utils/errorMessage.js';
import { $ } from '../../utils/dom.js';
import { COMPONENT_SELECTOR, CUSTOM_EVENT_TYPE } from '../../../constants/webApplication.js';

const { LOTTO_RULE } = Lotto;

class WinningDetailForm extends BaseComponent {
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
    if (isBonusNumber) {
      return `<input id="bonus-number-input" type="number" class="${styles.numberInput} bonus-number"/>`;
    }

    return Array.from({ length: count }, (_, index) => {
      const id = `winning-number-input-${index + 1}`;

      return `<input id="${id}" type="number" class="${styles.numberInput} winning-number"/>`;
    }).join('');
  }

  removeEvent() {
    this.off(
      { target: document, eventName: CUSTOM_EVENT_TYPE.buyLottoPrice },
      this.#handleRenderWinningDetailForm.bind(this),
    );

    this.off(
      { target: $(this, COMPONENT_SELECTOR.winningDetailForm), eventName: 'submit' },
      this.#handleSubmit.bind(this),
    );
  }

  setEvent() {
    this.on(
      { target: document, eventName: CUSTOM_EVENT_TYPE.buyLottoPrice },
      this.#handleRenderWinningDetailForm.bind(this),
    );

    this.on(
      { target: $(this, COMPONENT_SELECTOR.winningDetailForm), eventName: 'submit' },
      this.#handleSubmit.bind(this),
    );
  }

  #handleRenderWinningDetailForm() {
    this.#initWinningDetailInputs();

    this.classList.remove('close');

    this.#focusFirstWinningNumberInput();
  }

  #initWinningDetailInputs() {
    this.querySelectorAll(COMPONENT_SELECTOR.winningNumberInputs).forEach(
      (winningNumberInputElement) => {
        winningNumberInputElement.value = '';
      },
    );

    $(this, COMPONENT_SELECTOR.bonusNumberInput).value = '';
  }

  #focusFirstWinningNumberInput() {
    const winningNumberInputElementList = this.querySelectorAll(
      COMPONENT_SELECTOR.winningNumberInputs,
    );

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

      const params = this.#createWinningResultParams();
      const { winningRankResult, rateOfReturn } = WinningResultService.createWinningResult(params);

      removeErrorMessage(this);

      this.emit(CUSTOM_EVENT_TYPE.openModal, { winningRankResult, rateOfReturn });
    } catch (error) {
      this.#handleError(error);
    }
  }

  #handleError(error) {
    if (error instanceof AppError) {
      const nonPrefixErrorMessage = error.message.replace(AppError.PREFIX, '');
      showErrorMessage(nonPrefixErrorMessage, COMPONENT_SELECTOR.winningDetailForm);
    }
  }

  #createWinningResultParams() {
    const { winningNumber, bonusNumber } = this.#createWinningDetail();

    const { buyLottoPrice, lottoNumbers } = document
      .querySelector(COMPONENT_SELECTOR.purchasedLottoSection)
      .getBuyLottoDetails();

    return { winningNumber, bonusNumber, buyLottoPrice, lottoNumbers };
  }

  #createWinningDetail() {
    const winningNumber = Array.from(
      this.querySelectorAll(COMPONENT_SELECTOR.winningNumberInputs),
      (input) => input.value,
    )
      .filter((input) => input !== '')
      .map(Number);
    const bonusNumber = Number($(this, COMPONENT_SELECTOR.bonusNumberInput)?.value);

    WinningNumberValidator.checkWinningNumber(winningNumber);
    BonusNumberValidator.checkBonusNumber(bonusNumber, winningNumber);

    return { winningNumber, bonusNumber };
  }
}

customElements.define('winning-detail-form', WinningDetailForm);
