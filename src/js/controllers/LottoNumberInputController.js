import { $ } from '../utils/utils.js';
import { SELECTORS } from '../constants.js';

export default class LottoNumberInputController {
  constructor() {
    this.bindEvents();
  }

  handleInputLottoNumbers(event) {
    if (!event.target.classList.contains('lotto-number')) return;

    if (event.target.value.length >= 2) {
      const $nextInput = event.target.nextElementSibling;

      $nextInput?.focus();
      $nextInput?.select();
    }
  }

  bindEvents() {
    $(SELECTORS.LOTTO_NUMBERS_INPUT.FORM).addEventListener(
      'input',
      this.handleInputLottoNumbers.bind(this)
    );
  }
}
