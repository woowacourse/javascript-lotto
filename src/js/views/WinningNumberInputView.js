import { SELECTOR } from '../constants/selector';
import { $, $$ } from '../utils/element-manager';
import { winningNumberSectionTemplate } from '../utils/Lotto/template-manager';
import InputView from './InputView';

export default class WinningNumberView extends InputView {
  #winningNumberSection;

  constructor(element) {
    super();
    this.#winningNumberSection = element;
    this.bindWinningNumberKeydown();
  }

  bindWinningNumberKeydown() {
    this.#winningNumberSection.addEventListener('keydown', this.preventNonDigitInput.bind(this));
  }

  renderWinningNumbersInput() {
    if (this.#winningNumberSection.innerHTML.trim().length) {
      return;
    }

    this.#winningNumberSection.innerHTML = winningNumberSectionTemplate;
  }

  bindWinningNumberInputSubmit(handler) {
    this.#winningNumberSection.addEventListener('click', (event) => {
      event.preventDefault();

      if (event.target.id === SELECTOR.ID.SHOW_RESULT_BUTTON) {
        const winningNumbers = Array.from(
          $$(this.#winningNumberSection, `.${SELECTOR.CLASS.WINNING_NUMBER_INPUT}`)
        ).map((element) => Number(element.value));
        const bonusNumber = Number(
          $(this.#winningNumberSection, `.${SELECTOR.CLASS.BONUS_NUMBER_INPUT}`).value
        );

        handler({ winningNumbers, bonusNumber });
      }
    });
  }

  reset() {
    this.#winningNumberSection.replaceChildren();
  }
}
