import { $ } from '../utils/utils.js';
import { SELECTORS } from '../constants.js';

export default class LottoListController {
  constructor() {
    this.bindEvents();
  }

  handleToggleLottoNumbers() {
    $(SELECTORS.LOTTO_LIST.CONTAINER).classList.toggle('show-number');
  }

  handleToggleByEnter(event) {
    if (event.key === 'Enter') {
      event.target.click();
    }
  }

  bindEvents() {
    $(SELECTORS.LOTTO_LIST.LOTTO_NUMBERS_TOGGLE_BUTTON).addEventListener(
      'change',
      this.handleToggleLottoNumbers.bind(this)
    );

    $(SELECTORS.LOTTO_LIST.LOTTO_NUMBERS_TOGGLE_BUTTON).addEventListener(
      'keypress',
      this.handleToggleByEnter.bind(this)
    );
  }
}
