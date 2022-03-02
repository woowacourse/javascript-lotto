import { $ } from '../utils/dom.js';
import { extractWinningNumbers } from '../helper/lotto.js';
import { ID_SELECTOR } from '../constants.js';
import View from '../core/View.js';

export default class WinningNumbersFormView extends View {
  _configureDOM() {
    this.$winningNumbersForm = $(ID_SELECTOR.WINNING_NUMBERS_FORM, this.container);
  }

  _bindEvents() {
    this.$winningNumbersForm.addEventListener('submit', event => {
      event.preventDefault();
      this.props.submitWinningNumbersHandler(...extractWinningNumbers(event.target.elements));
    });
  }
}
