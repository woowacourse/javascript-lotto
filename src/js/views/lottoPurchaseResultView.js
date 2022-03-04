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

  toggleLottoNumbers() {
    this.#lottoNumbers = $$('.lotto-numbers');

    this.#lottoList.classList.toggle('grid-columns-six');
    this.#lottoList.classList.toggle('grid-columns-one');
    this.#lottoNumbers.forEach((element) => element.classList.toggle('hidden'));
  }

  restart() {
    this.#lottoPurchaseCount.textContent = '아직 구매하신 로또가 없습니다.';

    if (this.#showLottoToggle.checked) {
      this.#showLottoToggle.checked = false;
      this.toggleLottoNumbers();
    }

    while (this.#lottoList.firstChild) {
      this.#lottoList.removeChild(this.#lottoList.firstChild);
    }
  }
}
