import { $ } from '../utils/dom';

import makeTemplate from './template';

export default class InputView {
  constructor() {
    this.$result = $('#result');
  }

  renderWinningNumbersInput() {
    this.$result.insertAdjacentHTML('beforeend', makeTemplate.makeWinningNumbersTemplate());
  }
}
