import {
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  WINNING_NUMBER_CHECK_MESSAGE,
  LOTTO_NUMBERS_LENGTH,
  BONUS_NUMBER_LENGTH,
} from '../constants.js';
import { $, $$, show, hide, enable, disable } from '../utils/DOM.js';

export default class WinningNumberInput {
  constructor({ isVisible, updateWinningNumber, onShowModal }) {
    this.$winningNumberForm = $('.winning-number-form');
    this.$winningNumberInputs = $$('.winning-number');
    this.$bonusNumberInput = $('.bonus-number');
    this.$winningNumberCheckMessage = $('.winning-number-check-message');
    this.$openResultModalButton = $('.open-result-modal-button');

    this.isVisible = isVisible;
    this.checkMessage = '';
    this.winningNumber = {};
    this.updateWinningNumber = updateWinningNumber;
    this.onShowModal = onShowModal;

    this.attachEvents();
  }

  attachEvents() {
    this.$winningNumberForm.addEventListener('keyup', this.onChangeWinningNumberInput.bind(this));
    this.$openResultModalButton.addEventListener('click', this.onShowModal.bind(this));
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

    if (this.checkMessage === WINNING_NUMBER_CHECK_MESSAGE.COMPLETED) {
      this.setState({
        winningNumber: {
          winningNumbers: winningNumbers.map((v) => Number(v)),
          bonusNumber: Number(bonusNumber),
        },
      });
      this.updateWinningNumber(this.winningNumber);
    }
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

  setState({ isVisible, checkMessage, winningNumber }) {
    if (typeof isVisible === 'boolean') {
      this.isVisible = isVisible;
      this.renderForm();
    }

    if (typeof checkMessage === 'string' && this.checkMessage !== checkMessage) {
      this.checkMessage = checkMessage;
      this.renderCheckMessage();
    }

    if (typeof winningNumber === 'object') {
      this.winningNumber = winningNumber;
    }
  }

  renderCheckMessage() {
    this.$winningNumberCheckMessage.innerText = this.checkMessage;

    if (this.checkMessage !== WINNING_NUMBER_CHECK_MESSAGE.COMPLETED) {
      this.$winningNumberCheckMessage.classList.replace('text-green', 'text-red');
      disable(this.$openResultModalButton);
      return;
    }

    this.$winningNumberCheckMessage.classList.replace('text-red', 'text-green');
    enable(this.$openResultModalButton);
  }

  renderForm() {
    if (this.isVisible) {
      show(this.$winningNumberForm);
      this.$winningNumberInputs[0].focus();
    } else {
      hide(this.$winningNumberForm);
    }
  }
}
