import { SELECTOR } from '../constants/selector';
import { $, $$ } from '../utils/element-manager';

export default class WinningNumberView {
  #$container;

  constructor(element) {
    this.#$container = element;
    console.log($(this.#$container, `#${SELECTOR.ID.SHOW_RESULT_BUTTON}`));
  }

  showWinningNumbers() {
    this.#$container.classList.add('show');
  }

  bindWinningNumberInputSubmit(handler) {
    $(this.#$container, `#${SELECTOR.ID.SHOW_RESULT_BUTTON}`).addEventListener('click', (event) => {
      event.preventDefault();
      // $$(this.#$element, $());
      handler({ numbers: [1, 2, 3] });
    });
  }
}
