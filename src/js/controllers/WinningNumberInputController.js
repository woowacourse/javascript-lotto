import { $ } from '../utils/utils.js';
import { SELECTORS } from '../constants.js';

export default class WinningNumberInputController {
  constructor() {
    this.bindEvents();
  }

  handleInputWinningNumbers(event) {
    if (!event.target.classList.contains('winning-number')) return;

    if (event.target.value.length >= 2) {
      const $nextInput = event.target.nextElementSibling;

      if ($nextInput) {
        $nextInput.focus();
        $nextInput.select();
        return;
      }

      $(SELECTORS.BONUS_NUMBER_INPUT.INPUT).focus();
      $(SELECTORS.BONUS_NUMBER_INPUT.INPUT).select();
    }
  }

  bindEvents() {
    $(SELECTORS.WINNING_NUMBER_INPUT.FORM).addEventListener(
      'input',
      this.handleInputWinningNumbers.bind(this)
    );
  }
}
