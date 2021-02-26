import View from './View.js';
import { $, $$ } from '../utils/selector.js';
import { LOTTO_NUMBERS } from '../utils/constants.js';

export default class WinningResultView extends View {
  constructor($element) {
    super($element);
    this.$modal = $('.modal');
    this.winningNumbers = [];

    this.bindNumberInputEvent();
    this.bindFocusEvent();
    this.bindButtonEnableEvent();
    this.bindModalEvent();
  }

  bindNumberInputEvent() {
    $('#winning-numbers-form').addEventListener('submit', e => {
      e.preventDefault();
      this.winningNumbers = [
        ...$('#winning-numbers-form').getElementsByTagName('input'),
      ].map(input => Number(input.value));
    });
  }

  bindFocusEvent() {
    $$('.winning-number').forEach((winningNumber, idx) => {
      winningNumber.addEventListener('input', () =>
        this.moveFocus(winningNumber, idx)
      );
    });
  }

  bindButtonEnableEvent() {
    $('.bonus-number').addEventListener('input', () => {
      $('.open-result-modal-button').removeAttribute('disabled');
    });
  }

  bindModalEvent() {
    this.$element.addEventListener('submit', e => this.handleShowResult(e));

    $('.modal-close').addEventListener('click', () => this.closeModal());
    $('main').addEventListener('click', () => this.closeModal());
    $('.modal-inner').addEventListener('click', e => e.stopPropagation());
    $('#reset-btn').addEventListener('click', () => {
      this.closeModal();
      this.emit('clickResetBtn');
    });
  }

<<<<<<< HEAD
=======
  insertWinningNumber($element) {
    this.winningNumbers[$element.dataset.winningIndex] = Number($element.value);
  }

>>>>>>> bbd0775... refactor: rename dom to selector
  moveFocus($element, idx) {
    if ($element.value.length === 2) {
      if (idx === LOTTO_NUMBERS.WINNING_NUMBER_COUNT - 1) return;
      $$('.winning-number')[idx + 1].focus();
    }
  }

  handleShowResult(e) {
    e.preventDefault();
    this.emit('submitNumbers', this.winningNumbers);
  }

  showModal(rankCounts, earningRate) {
    this.$modal.classList.add('open');
    this.showRanks(rankCounts);
    this.showEarningRate(earningRate);
  }

  showRanks(rankCounts) {
    $$('.match-count').forEach((el, idx) => {
      el.innerText = rankCounts[rankCounts.length - idx - 1];
    });
  }

  showEarningRate(earningRate) {
    $('#profit').innerText = earningRate;
  }

  closeModal() {
    this.$modal.classList.remove('open');
  }

  resetWinningNumbers() {
    $$('.winning-number').forEach(winningNumber => {
      winningNumber.value = '';
    });
    this.winningNumbers = [];
  }
}
