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
  SELECTORS,
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
      SELECTORS.WINNING_NUMBER_INPUTS,
    );
    this.$bonusNumber = this.$container.querySelector(
      SELECTORS.BONUS_NUMBER_INPUT,
    );
    this.$button = this.$container.querySelector(SELECTORS.RESULT_BUTTON);
  }

  #bindEvents() {
    this.#attachInputListeners();
    this.#attachButtonClickListener();
  }

  #attachInputListeners() {
    const updateButtonState = () => {
      this.$button.disabled =
        this.$bonusNumber.value.trim() === '' ||
        Array.from(this.$winningNumbers).some(
          ($input) => $input.value.trim() === '',
        );
    };

    this.$winningNumbers.forEach(($input) =>
      $input.addEventListener('input', updateButtonState),
    );
    this.$bonusNumber.addEventListener('input', updateButtonState);
  }

  #attachButtonClickListener() {
    this.$container.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.onResultRequest) {
        const winningNumbers = Array.from(this.$winningNumbers).map((input) =>
          parseInt(input.value, 10),
        );
        const bonusNumber = parseInt(this.$bonusNumber.value, 10);
        this.onResultRequest({ winningNumbers, bonusNumber });
      }
    });
  }

  setOnResultRequest(callback) {
    this.onResultRequest = callback;
  }
}

export default WinningInputsFormView;
