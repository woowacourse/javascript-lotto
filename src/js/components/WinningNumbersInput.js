import { $, $$, show, hide, enable, clearInputValue } from '../utils/DOM.js';
import {
  APP_RESET,
  MODAL_OPENED,
  PURCHASE_AMOUNT_COMPLETED,
  WINNING_NUMBER_COMPLETED,
} from '../constants/appStages.js';
import {
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  LOTTO_NUMBERS_LENGTH,
  BONUS_NUMBER_LENGTH,
} from '../constants/lottoRules.js';
import { WINNING_NUMBER_CHECK_MESSAGE } from '../constants/display.js';

export default class WinningNumberInput {
  constructor({ lottoManager }) {
    this.isVisible = false;
    this.checkMessage = '';

    this.lottoManager = lottoManager;

    this.selectDOM();
    this.subscribe();
    this.attachEvents();
  }

  selectDOM() {
    this.$winningNumberForm = $('.winning-number-form');
    this.$winningNumberInputs = $$('.winning-number');
    this.$bonusNumberInput = $('.bonus-number');
    this.$winningNumberCheckMessage = $('.winning-number-check-message');
    this.$openResultModalButton = $('.open-result-modal-button');
  }

  subscribe() {
    this.lottoManager?.subscribe(PURCHASE_AMOUNT_COMPLETED, this.renderForm.bind(this));
    this.lottoManager?.subscribe(APP_RESET, this.resetWinningNumber.bind(this));
  }

  attachEvents() {
    this.$winningNumberForm.addEventListener('keyup', this.onChangeWinningNumberInput.bind(this));
    this.$openResultModalButton.addEventListener('click', () => this.lottoManager.setStates({ stage: MODAL_OPENED }));
  }

  onChangeWinningNumberInput(e) {
    if (e.target.type !== 'number') {
      return;
    }

    const { winningNumbers, bonusNumber } = {
      winningNumbers: [...e.currentTarget.querySelectorAll('.winning-number')].map(($input) => $input.value),
      bonusNumber: e.currentTarget.querySelector('.bonus-number').value,
    };

    const checkMessage = this.validateInput(
      [...winningNumbers, bonusNumber].filter((v) => v !== '').map((v) => Number(v))
    );
    this.setState({ checkMessage });

    if (this.checkMessage !== WINNING_NUMBER_CHECK_MESSAGE.COMPLETED) {
      return;
    }

    this.lottoManager.setStates({
      stage: WINNING_NUMBER_COMPLETED,
      winningNumber: {
        winningNumbers: winningNumbers.map((v) => Number(v)),
        bonusNumber: Number(bonusNumber),
      },
    });
  }

  validateInput(inputValues) {
    if (inputValues.some(this.isOutOfRange)) {
      return WINNING_NUMBER_CHECK_MESSAGE.OUT_OF_RANGE;
    }

    if (this.isDuplicated(inputValues)) {
      return WINNING_NUMBER_CHECK_MESSAGE.DUPLICATED;
    }

    if (this.hasBlank(inputValues)) {
      return WINNING_NUMBER_CHECK_MESSAGE.HAS_BLANK;
    }

    return WINNING_NUMBER_CHECK_MESSAGE.COMPLETED;
  }

  isOutOfRange(number) {
    return number < LOTTO_MIN_NUMBER || number > LOTTO_MAX_NUMBER;
  }

  isDuplicated(numbers) {
    return new Set(numbers).size !== numbers.length;
  }

  hasBlank(numbers) {
    return numbers.length !== LOTTO_NUMBERS_LENGTH + BONUS_NUMBER_LENGTH;
  }

  setState({ checkMessage }) {
    if (typeof checkMessage === 'string' && this.checkMessage !== checkMessage) {
      this.checkMessage = checkMessage;
      this.renderCheckMessage();
    }
  }

  resetWinningNumber() {
    hide(this.$winningNumberForm);
    clearInputValue(this.$bonusNumberInput);
    this.$winningNumberInputs.forEach(($input) => clearInputValue($input));
  }

  renderCheckMessage() {
    this.$winningNumberCheckMessage.innerText = this.checkMessage;

    if (this.checkMessage !== WINNING_NUMBER_CHECK_MESSAGE.COMPLETED) {
      this.$winningNumberCheckMessage.classList.replace('text-green', 'text-red');
      return;
    }

    this.$winningNumberCheckMessage.classList.replace('text-red', 'text-green');
    enable(this.$openResultModalButton);
  }

  renderForm() {
    show(this.$winningNumberForm);
    this.$winningNumberInputs[0].focus();
  }
}
