import View from './View.js';
import { $, $$ } from '../utils/dom.js';

export default class WinningNumberInput extends View {
  constructor($element) {
    super($element);

    this.$showResultButton = $('.open-result-modal-button');
    this.$modalClose = $('.modal-close');
    this.$modal = $('.modal');
    this.winningNumbers = [];

    this.bindNumberInputEvent();
    this.bindModalEvent();
  }

  bindNumberInputEvent() {
    $$('.winning-number').forEach(winningNumber => {
      winningNumber.addEventListener('change', () => {
        this.winningNumbers.push(winningNumber.value);
      });
    });

    $('.bonus-number').addEventListener('change', () => {
      this.winningNumbers.push($('.bonus-number').value);
    });

    $('.bonus-number').addEventListener('input', () => {
      this.$showResultButton.removeAttribute('disabled');
    });
  }

  bindModalEvent() {
    this.$element.addEventListener('submit', e => {
      this.handleShowResult(e);
    });
    this.$modalClose.addEventListener('click', this.onModalClose.bind(this));
  }

  handleShowResult(e) {
    e.preventDefault();
    console.log(this.winningNumbers);
  }

  onModalShow() {
    this.$modal.classList.add('open');
  }

  onModalClose() {
    this.$modal.classList.remove('open');
  }

  resetWinningNumbers() {
    this.winningNumbers = [];
  }
}
