import View from './View.js';
import { $, $$ } from '../utils/dom.js';

export default class WinningNumberInput extends View {
  constructor($element) {
    super($element);

    this.$showResultButton = $('.open-result-modal-button');
    this.$modalClose = $('.modal-close');
    this.$modal = $('.modal');
    this.winningNumbers = {};

    this.bindNumberInputEvent();
    this.bindModalEvent();
  }

  bindNumberInputEvent() {
    $$('.winning-number').forEach(winningNumber => {
      winningNumber.addEventListener('change', () => {
        this.winningNumbers[winningNumber.dataset.indexNum] =
          winningNumber.value;
      });
    });

    $('.bonus-number').addEventListener('input', () => {
      this.$showResultButton.removeAttribute('disabled');
    });
  }

  bindModalEvent() {
    this.$element.addEventListener('submit', e => {
      this.handleShowResult(e);
    });
    this.$modalClose.addEventListener('click', this.closeModal.bind(this));
  }

  handleShowResult(e) {
    e.preventDefault();
    this.emit('submitNumbers', this.winningNumbers);
  }

  showModal() {
    this.$modal.classList.add('open');
  }

  closeModal() {
    this.$modal.classList.remove('open');
  }

  resetWinningNumbers() {
    this.winningNumbers = [];
  }
}
