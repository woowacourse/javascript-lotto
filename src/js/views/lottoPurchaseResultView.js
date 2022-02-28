import { qs, qsAll, emit, on } from '../utils/helper.js';
import { lottoPurchaseCountTemplate, lottoPurchaseResultTemplate } from '../utils/template.js';

export default class lottoPurchaseResultView {
  constructor() {
    this.lottoPurchaseCount = qs('#lotto-purchase-count');
    this.lottoList = qs('#lotto-list');
    this.showLottoToggle = qs('#show-lotto-toggle');

    this.bindEvents();
  }

  bindEvents() {
    on(this.showLottoToggle, 'click', this.handleShowLottoToggle.bind(this));
  }

  handleShowLottoToggle() {
    emit(this.showLottoToggle, '@lottoToggle', '');
  }

  cleanLottoList() {
    this.lottoList.innerHTML = '';
  }

  renderLottoPurchaseCount(count) {
    this.lottoPurchaseCount.textContent = lottoPurchaseCountTemplate(count);
  }

  renderLottoPurchaseResult(lottoList) {
    this.lottoList.insertAdjacentHTML('afterbegin', lottoPurchaseResultTemplate(lottoList));
  }

  toggleLottoNumbers() {
    this.lottoNumbers = qsAll('.lotto-numbers');
    this.lottoList.classList.toggle('lotto-list-column');
    this.lottoNumbers.forEach((element) => element.classList.toggle('hidden'));
  }
}
