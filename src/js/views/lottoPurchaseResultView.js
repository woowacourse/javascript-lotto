import { $, $$, emit, on } from '../utils/helper.js';
import { lottoPurchaseCountTemplate, lottoPurchaseResultTemplate } from '../utils/template.js';

export default class lottoPurchaseResultView {
  #lottoPurchaseCount;

  #lottoList;

  #showLottoToggle;

  #lottoNumbers;

  constructor() {
    this.#lottoPurchaseCount = $('#lotto-purchase-count');
    this.#lottoList = $('#lotto-list');
    this.#showLottoToggle = $('#show-lotto-toggle');

    this.#attachEvents();
  }

  get showLottoToggle() {
    return this.#showLottoToggle;
  }

  #attachEvents() {
    on(this.#showLottoToggle, 'click', this.#handleShowLottoToggle.bind(this));
  }

  #handleShowLottoToggle() {
    emit(this.#showLottoToggle, '@lottoToggle');
  }

  render(count, lottoList) {
    this.#lottoPurchaseCount.textContent = lottoPurchaseCountTemplate(count);

    this.#lottoList.insertAdjacentHTML('afterbegin', lottoPurchaseResultTemplate(lottoList));
  }

  // renderLottoPurchaseCount(count) {}

  // renderLottoPurchaseResult(lottoList) {}

  toggleLottoNumbers() {
    this.#lottoNumbers = $$('.lotto-numbers');

    this.#lottoList.classList.toggle('grid-columns-six');
    this.#lottoList.classList.toggle('grid-columns-one');
    this.#lottoNumbers.forEach((element) => element.classList.toggle('hidden'));
  }
}
