import { validateInput } from '../model/winningNumberValidator.js';
import { $, $$, show, hide, enable, disable } from '../utils/DOM.js';

export default class WinningNumberInput {
  constructor({ isVisible, updateWinningNumber, onShowModal }) {
    this.$winningNumberForm = $('.winning-number-form');
    this.$winningNumberInputs = $$('.winning-number');
    this.$bonusNumberInput = $('.bonus-number');
    this.$winningNumberCheckMessage = $('.winning-number-check-message');
    this.$openResultModalButton = $('.open-result-modal-button');

    this.isVisible = isVisible;
    this.isFulfilled = false;
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

    const { isFulfilled, checkMessage } = validateInput(
      [...winningNumbers, bonusNumber].filter((v) => v !== '').map((v) => Number(v))
    );
    this.setState({ isFulfilled, checkMessage });

    if (!this.isFulfilled) {
      return;
    }

    this.setState({
      winningNumber: {
        winningNumbers: winningNumbers.map((v) => Number(v)),
        bonusNumber: Number(bonusNumber),
      },
    });
    this.updateWinningNumber(this.winningNumber);
  }

  setState({ isVisible, isFulfilled, checkMessage, winningNumber }) {
    if (typeof isVisible === 'boolean') {
      this.isVisible = isVisible;
      this.renderForm();
    }

    if (typeof isFulfilled === 'boolean') {
      this.isFulfilled = isFulfilled;
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

    if (!this.isFulfilled) {
      this.$winningNumberCheckMessage.classList.replace('text-green', 'text-red');
      disable(this.$openResultModalButton);
      return;
    }

    this.$winningNumberCheckMessage.classList.replace('text-red', 'text-green');
    enable(this.$openResultModalButton);
  }

  renderForm() {
    if (!this.isVisible) {
      hide(this.$winningNumberForm);
      return;
    }

    show(this.$winningNumberForm);
    this.$winningNumberInputs[0].focus();
  }
}
