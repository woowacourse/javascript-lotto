import { SELECTORS } from '../constants.js';
import { $, disableElement, showElement } from '../utils/utils.js';

export default class PurchaseFormView {
  render(lottoCount) {
    if (lottoCount) {
      $(SELECTORS.LOTTO_NUMBERS_INPUT.LOTTO_COUNT_TEXT).textContent = lottoCount;

      showElement($(SELECTORS.LOTTO_NUMBERS_INPUT.SECTION));
      disableElement($(SELECTORS.MONEY_INPUT.INPUT));
      disableElement($(SELECTORS.MONEY_INPUT.SUBMIT_BUTTON));
    }
  }
}
