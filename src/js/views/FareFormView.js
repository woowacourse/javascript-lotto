import { $ } from '../utils/index.js';

class FareFormView {
  #fareInput;

  #fareButton;

  constructor() {
    this.#fareInput = $('#fare-input');
    this.#fareButton = $('#fare-button');
  }

  renderFare(fare) {
    this.#fareInput.value = fare;
  }

  deactivateFareForm() {
    this.#fareInput.setAttribute('disabled', true);
    this.#fareButton.setAttribute('disabled', true);
  }

  reset() {
    this.#activateFareForm();
    this.#fareInput.value = '';
  }

  #activateFareForm() {
    this.#fareInput.removeAttribute('disabled');
    this.#fareButton.removeAttribute('disabled');
  }
}

export default FareFormView;
