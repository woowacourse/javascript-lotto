import $ from '../utils/dom';

import makeTemplate from './template';

export default class InputView {
  constructor() {
    this.$result = $('#result');
    this.$lottoPriceInput = $('#lotto-price-input');
  }

  renderWinningNumbersInput() {
    this.$result.insertAdjacentHTML('beforeend', makeTemplate.makeWinningNumbersTemplate());
  }

  initLottoPriceInput() {
    this.$lottoPriceInput.value = '';
  }
}
