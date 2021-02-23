import View from './View.js';
import { $, $$ } from '../utils/dom.js';

export default class WinningNumberInput extends View {
  constructor($element) {
    super($element);

    this.$modal = $('.modal');
    this.winningNumbers = {};

    this.bindNumberInputEvent();
    this.bindModalEvent();
  }

  bindNumberInputEvent() {
    $$('.winning-number').forEach(winningNumber => {
      winningNumber.addEventListener('change', () => {
        this.winningNumbers[winningNumber.dataset.indexNum] = Number(
          winningNumber.value
        );
      });
    });

    $('.bonus-number').addEventListener('input', () => {
      $('.open-result-modal-button').removeAttribute('disabled');
    });
  }

  bindModalEvent() {
    this.$element.addEventListener('submit', e => {
      this.handleShowResult(e);
    });
    $('.modal-close').addEventListener('click', () => this.closeModal());
    $('#reset-btn').addEventListener('click', () => {
      this.closeModal();
      this.emit('clickResetBtn');
    });
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
