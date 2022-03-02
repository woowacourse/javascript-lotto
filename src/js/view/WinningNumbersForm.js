import { $ } from '../utils/dom.js';
import { getWinningNumbers } from '../utils/common.js';
import { ID_SELECTOR, CLASS_NAME } from '../constants.js';
import View from '../core/View.js';

export default class WinningNumbersFormView extends View {
  _configureDOM() {
    this.$winningNumberSection = $(ID_SELECTOR.WINNING_NUMBERS_SECTION);
    this.$winningNumbersForm = $(ID_SELECTOR.WINNING_NUMBERS_FORM);
  }

  _bindEvents() {
    this.$winningNumbersForm.addEventListener('submit', event => {
      event.preventDefault();
      this.props.submitWinningNumbersHandler(...getWinningNumbers(event.target.elements));
    });
  }

  showWinningNumbersSection() {
    this.$winningNumberSection.classList.remove(CLASS_NAME.WINNING_NUMBERS_SECTION_DISPLAY_NONE);
  }
}
