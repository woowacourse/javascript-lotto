import {
  LOTTO_IMAGE_TEMPLATE,
  PURCHASED_LOTTO_TEMPLATE,
  getLottoListTemplate,
} from './template.js';

export default class PurchasedLottoView {
  constructor() {
    this.initDom();
  }

  initDom() {
    this.container = document.getElementById('purchased-lotto-container');
  }

  render(lottoCount, lottos) {
    this.container.insertAdjacentHTML('beforeend', PURCHASED_LOTTO_TEMPLATE);
    this.purchasedLottoCount = document.getElementById('purchased-lotto-count');
    this.purchasedLottoCount.textContent = lottoCount;

    this.renderPurchasedLottoList(lottoCount, lottos);
    this.addToggleClickEvent();
  }

  renderPurchasedLottoList(lottoCount, lottos) {
    this.purchasedLottoListOff = document.getElementById(
      'purchased-lotto-list-off',
    );

    this.purchasedLottoListOff.insertAdjacentHTML(
      'afterbegin',
      LOTTO_IMAGE_TEMPLATE.repeat(lottoCount),
    );

    this.purchasedLottoListOn = document.getElementById(
      'purchased-lotto-list-on',
    );

    const lottoList = getLottoListTemplate(lottos);
    this.purchasedLottoListOn.insertAdjacentHTML('beforeend', lottoList);
  }

  addToggleClickEvent() {
    this.toggle = document.getElementById('purchased-lotto-number-switch');

    this.toggle.addEventListener('click', () => {
      this.purchasedLottoListOff.classList.toggle('hidden');
      this.purchasedLottoListOn.classList.toggle('hidden');
    });
  }

  reset() {
    this.container.removeChild(this.container.lastElementChild);
    this.container.removeChild(this.container.lastElementChild);
  }
}
