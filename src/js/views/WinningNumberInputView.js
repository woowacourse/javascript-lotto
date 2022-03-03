import { SELECTOR } from '../constants/selector';
import { $, $$ } from '../utils/element-manager';

export default class WinningNumberView {
  #$container;

  constructor(element) {
    this.#$container = element;
  }

  showWinningNumbers() {
    this.#$container.classList.add('show');
  }

  bindWinningNumberInputSubmit(handler) {
    $(this.#$container, `#${SELECTOR.ID.SHOW_RESULT_BUTTON}`).addEventListener('click', (event) => {
      event.preventDefault();
      const winningNumbers = Array.from(
        $$(this.#$container, `.${SELECTOR.CLASS.WINNING_NUMBER_INPUT}`)
      ).map((element) => Number(element.value));
      const bonusNumber = Number($(this.#$container, '.bonus-number-input').value);
      handler({ winningNumbers, bonusNumber });
    });
  }
}
