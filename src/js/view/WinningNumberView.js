import { ID_SELECTOR } from '../constants';
import { $ } from '../utils/dom';

export class WinningNumberView {
  constructor() {
    this.#configureDOM();
  }

  #configureDOM() {
    this.$pickedNumbersForm = $(ID_SELECTOR.PICKED_NUMBERS_FORM);
  }

  bindCheckResult(handler) {
    this.$pickedNumbersForm.addEventListener('submit', event => {
      event.preventDefault();
      handler([...event.target.elements.pickedNumber].map(input => input.value));
    });
  }
}
