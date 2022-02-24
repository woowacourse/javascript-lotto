import { PURCHASED_LOTTO_TEMPLATE, getLottoListTemplate } from './template.js';

export default class PurchasedLottoView {
  constructor() {
    this.initDom();
  }

  initDom() {
    this.container = document.getElementById('purchased-lotto-container');
  }

  render(lottos, lottoCount) {
    this.container.insertAdjacentHTML('beforeend', PURCHASED_LOTTO_TEMPLATE);
    this.purchasedLottoCount = document.getElementById('purchased-lotto-count');
    this.purchasedLottoCount.textContent = lottoCount;

    this.renderPurchasedLottoList(lottos);
    this.addToggleClickEvent();
  }

  renderPurchasedLottoList(lottos) {
    this.detailPurchasedLottoList = document.getElementById(
      'detail-purchased-lotto-list',
    );

    const lottoList = getLottoListTemplate(lottos);
    this.detailPurchasedLottoList.insertAdjacentHTML('beforeend', lottoList);
  }

  addToggleClickEvent() {
    this.toggle = document.getElementById('on-off-switch');

    this.toggle.addEventListener('click', () => {
      const classList = this.detailPurchasedLottoList.classList;

      if (classList.contains('switch-off')) {
        classList.replace('switch-off', 'switch-on');
        return;
      }
      classList.replace('switch-on', 'switch-off');
    });
  }

  reset() {
    this.container.removeChild(this.container.lastElementChild);
  }
}
