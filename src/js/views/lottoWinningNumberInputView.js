import { $ } from '../utils/helper.js';
import { lottoWinningNumberInputTemplate } from '../utils/template.js';

export default class LottoWinningNumberInputView {
  #lottoPurchaseResult;

  constructor() {
    this.#lottoPurchaseResult = $('#lotto-purchase-result');
  }

  renderlottoWinningNumberInput() {
    this.#lottoPurchaseResult.insertAdjacentHTML(
      'afterend',
      lottoWinningNumberInputTemplate()
    );
  }
}
