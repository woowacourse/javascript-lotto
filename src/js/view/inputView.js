import makeTemplate from './template';

export default class InputView {
  constructor() {
    this.$result = document.querySelector('#result');
  }

  renderWinningNumbersInput() {
    this.$result.insertAdjacentHTML('beforeend', makeTemplate.makeWinningNumbersTemplate());
  }
}
