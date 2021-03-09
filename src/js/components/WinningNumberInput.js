import { LOTTO_NUMBER_CHECK_MESSAGE } from '../constants.js';
import { $, $$, show, hide } from '../utils/DOM.js';
import { getLottoNumberCheckMessage, renderCheckMessage } from '../model/LottoNumbersValidation.js';

export default class WinningNumberInput {
  constructor({ isVisible, updateWinningNumber, onShowModal }) {
    this.$winningNumberForm = $('.winning-number-form');
    this.$winningNumberInputs = $$('.winning-number');
    this.$bonusNumberInput = $('.bonus-number');
    this.$winningNumberCheckMessage = $('.winning-number-check-message');
    this.$openResultModalButton = $('.open-result-modal-button');

    this.isVisible = isVisible;
    this.winningNumber = {};

    this.updateWinningNumber = updateWinningNumber;
    this.onShowModal = onShowModal;

    this.attachEvents();
  }

  attachEvents() {
    this.$winningNumberForm.addEventListener('keyup', this.onChangeWinningNumberInput.bind(this));
    this.$winningNumberForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.onShowModal();
    });
  }

  onChangeWinningNumberInput(e) {
    if (e.target.type !== 'number') {
      return;
    }

    const { winningNumbers, bonusNumber } = {
      winningNumbers: [...e.currentTarget.querySelectorAll('.winning-number')].map(($input) => $input.value),
      bonusNumber: e.currentTarget.querySelector('.bonus-number').value,
    };

    const checkMessage = getLottoNumberCheckMessage({
      type: 'winningNumbers',
      numbers: [...winningNumbers, bonusNumber].filter((v) => v !== '').map((v) => Number(v)),
    });

    renderCheckMessage({
      $target: this.$winningNumberCheckMessage,
      $resultButton: this.$openResultModalButton,
      checkMessage,
    });

    if (checkMessage === LOTTO_NUMBER_CHECK_MESSAGE.COMPLETED) {
      this.setState({
        winningNumber: {
          winningNumbers: winningNumbers.map((v) => Number(v)),
          bonusNumber: Number(bonusNumber),
        },
      });
      this.updateWinningNumber(this.winningNumber);
    }
  }

  setState({ isVisible, winningNumber }) {
    if (typeof isVisible === 'boolean') {
      this.isVisible = isVisible;
      this.renderForm();
    }

    if (typeof winningNumber === 'object') {
      this.winningNumber = winningNumber;
    }
  }

  reset() {
    this.$winningNumberForm.reset();
  }

  renderForm() {
    if (this.isVisible) {
      show(this.$winningNumberForm);
      this.$winningNumberInputs[0].focus();
    } else {
      hide(this.$winningNumberForm);
      this.reset();
    }
  }
}
