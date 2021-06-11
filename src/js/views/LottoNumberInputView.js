import { SELECTORS } from '../constants.js';
import { $, showElement } from '../utils/utils.js';

export default class LottoNumberInputView {
  render(lottoCount) {
    showElement($(SELECTORS.LOTTO_NUMBERS_INPUT.SECTION));
    $(SELECTORS.LOTTO_NUMBERS_INPUT.LOTTO_COUNT_TEXT).textContent = lottoCount;
  }
}
