import View from './View.js';
import { $, $$ } from '../utils/dom.js';
import { LOTTO_NUMBERS } from '../utils/constants.js';

export default class WinningResultView extends View {
  constructor($element) {
    super($element);
    this.$modal = $('.modal');
    this.$winningNumberInputs = $$('.winning-number');
    this.winningNumbers = {};

    this.bindNumberInputEvent();
    this.bindModalCloseEvent();
  }

  resetWinningNumbers() {
    this.$winningNumberInputs.forEach(winningNumber => {
      winningNumber.value = '';
    });
    this.winningNumbers = [];
  }

  bindNumberInputEvent() {
    this.$winningNumberInputs.forEach((winningNumber, idx) => {
      winningNumber.addEventListener('change', () =>
        this.inputWinningNumberHandler(winningNumber)
      );
      winningNumber.addEventListener('input', () =>
        this.moveFocusHandler(winningNumber, idx)
      );
    });

    this.$element.addEventListener('submit', e =>
      this.submitWinningNumberHandler(e)
    );
  }

  inputWinningNumberHandler($element) {
    this.winningNumbers[$element.dataset.indexNum] = Number($element.value);
  }

  moveFocusHandler($element, idx) {
    if ($element.value.length === 2) {
      if (idx === LOTTO_NUMBERS.WINNING_NUMBER_COUNT - 1) return;
      this.$winningNumberInputs[idx + 1].focus();
    }
  }

  submitWinningNumberHandler(e) {
    e.preventDefault();
    this.emit('submitNumbers', this.winningNumbers);
  }

  bindModalCloseEvent() {
    $('.modal-close').addEventListener('click', () => this.closeModal());
    $('main').addEventListener('click', () => this.closeModal());
    $('.modal-inner').addEventListener('click', e => e.stopPropagation());
    $('#reset-btn').addEventListener('click', () =>
      this.clickResetBtnHandler()
    );
  }

  clickResetBtnHandler() {
    this.closeModal();
    this.emit('clickResetBtn');
  }

  closeModal() {
    this.$modal.classList.remove('open');
  }

  showModal(rankCounts, earningRate) {
    this.$modal.classList.add('open');
    this.renderRanks(rankCounts);
    this.renderEarningRate(earningRate);
  }

  renderRanks(rankCounts) {
    $$('.match-count').forEach((el, idx) => {
      el.innerText = rankCounts[rankCounts.length - idx - 1];
    });
  }

  renderEarningRate(earningRate) {
    $('#profit').innerText = earningRate;
  }
}
