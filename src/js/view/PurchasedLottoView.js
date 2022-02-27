import {
  LOTTO_IMAGE_TEMPLATE,
  PURCHASED_LOTTO_TEMPLATE,
  getLottoListTemplate,
} from './template.js';

export default class PurchasedLottoView {
  constructor() {
    this.container = document.getElementById('purchased-lotto-container');
  }

  render(lottoCount, lottos) {
    this.container.insertAdjacentHTML('beforeend', PURCHASED_LOTTO_TEMPLATE);
    const purchasedLottoCount = this.container.querySelector('#purchased-lotto-count');
    purchasedLottoCount.textContent = lottoCount;

    this.renderPurchasedLottoList(lottoCount, lottos);
    this.addToggleClickEvent();
  }

  renderPurchasedLottoList(lottoCount, lottos) {
    this.singlePurchasedLottoList = this.container.querySelector(
      '#single-purchased-lotto-list',
    );
    this.singlePurchasedLottoList.insertAdjacentHTML(
      'afterbegin',
      LOTTO_IMAGE_TEMPLATE.repeat(lottoCount),
    );

    this.detailPurchasedLottoList = this.container.querySelector(
      '#detail-purchased-lotto-list',
    );
    const lottoList = getLottoListTemplate(lottos);
    this.detailPurchasedLottoList.insertAdjacentHTML('beforeend', lottoList);
  }

  addToggleClickEvent() {
    const switchElement = this.container.querySelector('#on-off-switch');

    switchElement.addEventListener('click', () => {
      this.singlePurchasedLottoList.classList.toggle('hidden');
      this.detailPurchasedLottoList.classList.toggle('hidden');
    });
  }

  reset() {
    this.container.removeChild(this.container.lastElementChild);
  }
}
