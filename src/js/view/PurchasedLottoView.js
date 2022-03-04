import {
  LOTTO_IMAGE_TEMPLATE,
  PURCHASED_LOTTO_TEMPLATE,
  getLottoListTemplate,
} from './template.js';

export default class PurchasedLottoView {
  constructor() {
    this.#initDom();
  }

  #initDom() {
    this.container = document.getElementById('purchased-lotto-container');
  }

  #addToggleClickEvent() {
    this.toggle = document.getElementById('on-off-switch');

    this.toggle.addEventListener('click', () => {
      [this.singlePurchasedLottoList, this.detailPurchasedLottoList].forEach(
        list => list.classList.toggle('hidden'),
      );
    });
  }

  #renderPurchasedLottoList(lottoCount, lottos) {
    this.singlePurchasedLottoList = document.getElementById(
      'single-purchased-lotto-list',
    );

    this.singlePurchasedLottoList.insertAdjacentHTML(
      'afterbegin',
      LOTTO_IMAGE_TEMPLATE.repeat(lottoCount),
    );

    this.detailPurchasedLottoList = document.getElementById(
      'detail-purchased-lotto-list',
    );

    const lottoList = getLottoListTemplate(lottos);
    this.detailPurchasedLottoList.insertAdjacentHTML('beforeend', lottoList);
  }

  render(lottoCount, lottos) {
    this.container.insertAdjacentHTML('beforeend', PURCHASED_LOTTO_TEMPLATE);
    this.purchasedLottoCount = document.getElementById('purchased-lotto-count');
    this.purchasedLottoCount.textContent = lottoCount;

    this.#renderPurchasedLottoList(lottoCount, lottos);
    this.#addToggleClickEvent();
  }

  reset() {
    this.container.removeChild(this.container.lastElementChild);
  }
}
