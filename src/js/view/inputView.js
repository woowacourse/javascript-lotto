import { $ } from '../utils/dom';

import makeTemplate from './template';

export default class InputView {
  constructor() {
    this.$result = $('#result');
    this.$lottoPriceForm = $('#lotto-price-form');
    this.$lottoPriceInput = $('#lotto-price-input', this.$lottoPriceForm);
    this.$lottoPriceButton = $('#lotto-price-button', this.$lottoPriceForm);
  }

  disableLottoPriceForm() {
    this.$lottoPriceInput.disabled = true;
    this.$lottoPriceButton.disabled = true;
    this.$lottoPriceButton.classList.add('disable');
  }

  activeLottoPriceForm() {
    this.$lottoPriceInput.disabled = false;
    this.$lottoPriceButton.disabled = false;
    this.$lottoPriceButton.classList.remove('disable');
  }

  renderWinningNumbersInput() {
    this.$result.insertAdjacentHTML('beforeend', makeTemplate.makeWinningNumbersTemplate());
  }

  initLottoPriceInput() {
    this.$lottoPriceInput.value = '';
  }
}
