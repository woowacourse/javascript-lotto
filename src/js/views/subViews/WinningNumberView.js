import { SELECTOR } from '../../configs/contants.js';
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
  }

  getInputedNumbers() {
    const winningNumbers = [...this.$$winningNumberInput].map((input) => {
      return Number(input.value);
    });
    const bonusNumber = Number(this.$bonusNumberInput.value);

    return { winningNumbers, bonusNumber };
  }

  bindOnClickShowResultButton(callback) {
    this.$showResultButton.addEventListener('click', (event) => {
      event.preventDefault();
      callback(this.getInputedNumbers());
    });
  }
}
