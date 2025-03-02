import ViewComponent from '../core/ViewComponent.js';
import {
  getInstructionMarkup,
  getInputsLabelsMarkup,
  getButtonMarkup,
  generateInputs,
} from './template.js';
import {
  WINNING_NUMBERS_COUNT,
  WINNING_NUMBER_MAX_LENGTH,
  WINNING_INPUTS_FORM_SELECTORS,
} from '../../../common/constants/WinningInputsFormConstants.js';

class WinningInputsFormView extends ViewComponent {
  constructor($container) {
    super($container);
    this.render();
    this.#bindEvents();
  }

  render() {
    this.$container.innerHTML = this.#template();
    this.#initElements();
  }

  #template() {
    return `
      ${getInstructionMarkup()}
      ${getInputsLabelsMarkup()}
      ${generateInputs(WINNING_NUMBERS_COUNT, WINNING_NUMBER_MAX_LENGTH)}
      ${getButtonMarkup()}
    `;
  }

  #initElements() {
    this.$winningNumbers = this.$container.querySelectorAll(
      WINNING_INPUTS_FORM_SELECTORS.WINNING_NUMBER_INPUTS,
    );
    this.$bonusNumber = this.$container.querySelector(
      WINNING_INPUTS_FORM_SELECTORS.BONUS_NUMBER_INPUT,
    );
    this.$button = this.$container.querySelector(
      WINNING_INPUTS_FORM_SELECTORS.RESULT_BUTTON,
    );
  }

  #bindEvents() {
    this.#removeEvents();
    this.$winningNumbers.forEach(($input) =>
      $input.addEventListener('input', this.#handleInputChange),
    );
    this.$bonusNumber.addEventListener('input', this.#handleInputChange);
    this.$container.addEventListener('submit', this.#handleFormSubmit);
  }

  #removeEvents() {
    if (this.$winningNumbers) {
      this.$winningNumbers.forEach(($input) =>
        $input.removeEventListener('input', this.#handleInputChange),
      );
    }

    if (this.$bonusNumber) {
      this.$bonusNumber.removeEventListener('input', this.#handleInputChange);
    }

    if (this.$container) {
      this.$container.removeEventListener('submit', this.#handleFormSubmit);
    }
  }

  #handleInputChange = () => {
    this.$button.disabled =
      this.$bonusNumber.value.trim() === '' ||
      Array.from(this.$winningNumbers).some(
        ($input) => $input.value.trim() === '',
      );
  };

  #handleFormSubmit = (e) => {
    e.preventDefault();
    if (!this.onResultRequest) return;

    const winningNumbers = Array.from(this.$winningNumbers).map((input) =>
      parseInt(input.value, 10),
    );
    const bonusNumber = parseInt(this.$bonusNumber.value, 10);
    this.onResultRequest({ winningNumbers, bonusNumber });
  };

  setOnResultRequest(callback) {
    this.onResultRequest = callback;
  }
}

export default WinningInputsFormView;
