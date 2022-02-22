import { $ } from '../utils/helper.js';
import {
  lottoPurchaseCountTemplate,
  lottoPurchaseResultTemplate,
} from '../utils/template.js';

export default class lottoPurchaseResultView {
  constructor() {
    this.lottoPurchaseCount = $('#lotto-purchase-count');
    this.lottoList = $('#lotto-list');
  }

  renderLottoPurchaseCount(count) {
    this.lottoPurchaseCount.textContent = lottoPurchaseCountTemplate(count);
  }

  renderLottoPurchaseResult(lottoList) {
    this.lottoList.insertAdjacentHTML(
      'afterbegin',
      lottoPurchaseResultTemplate(lottoList)
    );
  }
}