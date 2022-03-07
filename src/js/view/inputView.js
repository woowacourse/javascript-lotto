import $ from '../utils/dom';

import makeTemplate from './template';

export default class InputView {
  constructor() {
    this.$result = $('#result');
    this.$lottoPriceForm = $('#lotto-price-form');
    this.$lottoPriceInput = this.$lottoPriceForm.querySelector('#lotto-price-input');
    this.$lottoPriceButton = this.$lottoPriceForm.querySelector('#lotto-price-button');
  }

  disableLottoPriceForm() {
    this.$lottoPriceInput.disabled = true;
    this.$lottoPriceButton.disabled = true;
    this.$lottoPriceButton.classList.add('disable');
  }

  renderWinningNumbersInput() {
    this.$result.insertAdjacentHTML('beforeend', makeTemplate.makeWinningNumbersTemplate());
  }

  initLottoPriceInput() {
    this.$lottoPriceInput.value = '';
  }
}
