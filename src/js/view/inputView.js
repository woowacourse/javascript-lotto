import makeTemplate from './template';

export default class InputView {
  constructor() {
    this.$result = document.querySelector('#result');
    this.$lottoPriceInput = document.querySelector('#lotto-price-input');
  }

  renderWinningNumbersInput() {
    this.$result.insertAdjacentHTML('beforeend', makeTemplate.makeWinningNumbersTemplate());
  }

  initLottoPriceInput() {
    this.$lottoPriceInput.value = '';
  }
}
