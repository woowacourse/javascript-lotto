import { $ } from '../utils/dom';
import { extractWinningNumbers } from '../helper/lotto';
import { ID_SELECTOR } from '../constants';
import View from '../core/View';

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
