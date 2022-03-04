import { qs, qsAll, newCustomEvent, on } from '../utils/helper.js';
import { lottoPurchaseCountTemplate, lottoPurchaseResultTemplate } from '../utils/template.js';

export default class lottoPurchaseResultView {
  constructor() {
    this.lottoPurchaseCount = qs('#lotto-purchase-count');
    this.lottoList = qs('#lotto-list');
    this.lottoToggle = qs('#show-lotto-toggle');
    this.toggleButton = qs('#lotto-toggle-wrap');
    this.bindEvents();
  }

  bindEvents() {
    on(this.lottoToggle, 'click', this.handleShowLottoToggle.bind(this));
  }

  handleShowLottoToggle() {
    newCustomEvent(this.lottoToggle, '@lottoToggle', '');
  }

  cleanLottoList() {
    this.lottoList.innerHTML = '';
    this.lottoPurchaseCount.textContent = '아직 구매하신 로또가 없습니다.';
    this.lottoToggle.checked = false;
    this.lottoList.classList.remove('lotto-list-column');
    this.toggleButton.style.opacity = 0;
  }

  showLottoToggleButton() {
    this.toggleButton.style.opacity = 0.99;
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
