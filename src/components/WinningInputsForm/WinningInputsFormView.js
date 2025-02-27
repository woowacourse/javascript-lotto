import ViewComponent from '../core/ViewComponent.js';
import {
  getInstructionMarkup,
  getInputsLabelsMarkup,
  getButtonMarkup,
  generateInputs,
} from './template.js';

class WinningInputsFormView extends ViewComponent {
  render() {
    this.container.innerHTML = this.template();
    this.initElements();
  }

  template() {
    return `
      ${getInstructionMarkup()}
      ${getInputsLabelsMarkup()}
      ${generateInputs({ count: 6, className: 'winning', maxlength: 2 })}
      ${getButtonMarkup()}
    `;
  }

  initElements() {
    this.winningNumbers = this.container.querySelectorAll(
      '.number-input.winning',
    );
    this.bonusNumber = this.container.querySelector('.number-input.bonus');
    this.button = this.container.querySelector('.big-button');
  }

  bindEvents() {
    this.attachInputListeners();
    this.attachButtonClickListener();
  }

  attachInputListeners() {
    const updateButtonState = () => {
      this.button.disabled =
        this.bonusNumber.value.trim() === '' ||
        Array.from(this.winningNumbers).some(
          (input) => input.value.trim() === '',
        );
    };

    this.winningNumbers.forEach((input) =>
      input.addEventListener('input', updateButtonState),
    );
    this.bonusNumber.addEventListener('input', updateButtonState);
  }

  attachButtonClickListener() {
    this.button.addEventListener('click', () => {
      if (this.onResultRequest) {
        const winningNumbers = Array.from(this.winningNumbers).map((input) =>
          parseInt(input.value, 10),
        );
        const bonusNumber = parseInt(this.bonusNumber.value, 10);
        this.onResultRequest({ winningNumbers, bonusNumber });
      }
    });
  }

  setOnResultRequest(callback) {
    this.onResultRequest = callback;
  }
}

export default WinningInputsFormView;
