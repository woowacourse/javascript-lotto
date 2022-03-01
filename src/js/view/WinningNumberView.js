import { CLASS_SELECTOR, ID_SELECTOR } from '../constants';
import { $$ } from '../utils/dom';

export class WinningNumberView {
  constructor() {
    this.#configureDOM();
  }

  #configureDOM() {
    this.$winningNumbersForm = $(ID_SELECTOR.WINNING_NUMBERS_FORM);
    this.$winningNumbersCheckButton = $(ID_SELECTOR.WINNING_NUMBERS_CHECK_BUTTON);
    this.$winningNumberInputs = $$(CLASS_SELECTOR.WINNING_NUMBER_INPUT);
  }

  bindSubmitCash(handler) {
    this.$purchaseForm.addEventListener('submit', event => {
      event.preventDefault();
      handler(event.target.elements.cash.value);
    });
  }
}
