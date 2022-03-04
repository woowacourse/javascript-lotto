import { SELECTOR } from '../constants/selector';
import { $, $$ } from '../utils/element-manager';
import { winningNumberSectionTemplate } from '../utils/Lotto/template-manager';

export default class WinningNumberView {
  #winningNumberSection;

  constructor(element) {
    this.#winningNumberSection = element;
    this.winningNumberInputHandler();
  }

  winningNumberInputHandler() {
    this.#winningNumberSection.addEventListener('keypress', this.preventNonDigitInput.bind(this));
  }

  preventNonDigitInput(event) {
    if (event.key.match(/[0-9]/) && event.target.value.length < 2) {
      return;
    }
    const keypressInput = event.which;
    if ((keypressInput !== 8 && keypressInput !== 0 && keypressInput < 48) || keypressInput > 57) {
      event.preventDefault();
    }
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
