import { $, enableElement, hideElement } from './utils/utils.js';
import { SELECTORS } from './constants.js';

export default class LottoView {
  init() {
    hideElement($(SELECTORS.LOTTO_LIST.SECTION));
    hideElement($(SELECTORS.WINNING_NUMBER_INPUT.SECTION));
    enableElement($(SELECTORS.MONEY_INPUT.INPUT));
    enableElement($(SELECTORS.MONEY_INPUT.SUBMIT_BUTTON));

    $(SELECTORS.MONEY_INPUT.FORM).reset();
    $(SELECTORS.LOTTO_NUMBERS_INPUT.FORM).reset();
    $(SELECTORS.WINNING_NUMBER_INPUT.FORM).reset();
    $(SELECTORS.MONEY_INPUT.INPUT).focus();
    $(SELECTORS.LOTTO_LIST.ELEMENT).remove();
  }
}
