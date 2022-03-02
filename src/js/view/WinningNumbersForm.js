import { $, $$, clearInputValue } from '../utils/dom';
import { extractWinningNumbers } from '../helper/lotto';
import { ID_NAME, ID_SELECTOR } from '../constants';
import View from '../core/View';

export default class WinningNumbersFormView extends View {
  _configureDOM() {
    this.$winningNumbersForm = $(ID_SELECTOR.WINNING_NUMBERS_FORM, this.container);
    this.$submitButton = $(ID_SELECTOR.RESULT_SUBMIT_BUTTON, this.container);
  }

  _bindEvents() {
    this.$winningNumbersForm.addEventListener('submit', event => {
      event.preventDefault();
      this.props.submitWinningNumbersHandler(...extractWinningNumbers(event.target.elements));
    });

    this.$winningNumbersForm.addEventListener('keyup', ({ target }) => {
      if (target.tagName !== 'INPUT') return;
      if (target.value.length < 2) return;
      if (target.id === ID_NAME.BONUS_NUMBER_INPUT) {
        this.$submitButton.focus();
        return;
      }
      if (!target.nextSibling.nextElementSibling) {
        $(ID_SELECTOR.BONUS_NUMBER_INPUT, this.container).focus();
        return;
      }
      target.nextSibling.nextElementSibling.focus();
    });
  }

  reset() {
    this.hide();
    $$(ID_SELECTOR.REGULAR_NUMBER_INPUT, this.container).forEach(clearInputValue);
    clearInputValue($(ID_SELECTOR.BONUS_NUMBER_INPUT, this.container));
  }
}
