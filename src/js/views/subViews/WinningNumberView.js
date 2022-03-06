import { DOM_STRING, SELECTOR } from '../../configs/contants.js';
import template from '../../templates/template.js';
import { $, $$ } from '../../utils/utils.js';

export default class WinningNumberView {
  constructor(target) {
    this.$target = $(target);
  }

  render() {
    this.mountTemplate();
    this.afterMounted();
  }

  mountTemplate() {
    this.$target.innerHTML = template.winningNumberSection();
  }

  afterMounted() {
    this.$$winningNumberInput = $$(SELECTOR.WINNING_NUMBER_INPUT);
    this.$bonusNumberInput = $(SELECTOR.BONUS_NUMBER_INPUT);
    this.$showResultButton = $(SELECTOR.SHOW_RESULT_BUTTON);
    this.$resetButton = $(SELECTOR.WINNING_NUMBER_SECTION_RESET_BUTTON);
  }

  getInputedNumbers() {
    const winningNumbers = [...this.$$winningNumberInput].map((input) => {
      return Number(input.value);
    });
    const bonusNumber = Number(this.$bonusNumberInput.value);

    return { winningNumbers, bonusNumber };
  }

  clearInputs() {
    this.$$winningNumberInput.forEach((input) => (input.value = ''));
    this.$bonusNumberInput.value = '';
  }

  showResetButton() {
    this.$resetButton.classList.remove(DOM_STRING.BLIND);
  }

  removeResetButton() {
    this.$resetButton.classList.add(DOM_STRING.BLIND);
  }

  bindOnClickShowResultButton(callback) {
    this.$showResultButton.addEventListener('click', (event) => {
      event.preventDefault();
      callback(this.getInputedNumbers());
    });
  }

  bindOnClickResetButton(callback) {
    this.$resetButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.removeResetButton();
      callback();
    });
  }
}
