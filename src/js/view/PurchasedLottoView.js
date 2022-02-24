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
    this.purchasedLottoList = document.getElementById('purchased-lotto-list');
    this.purchasedLottoList.insertAdjacentHTML(
      'beforeend',
      getLottoListTemplate(lottos),
    );
  }

  addToggleClickEvent() {
    this.switch = document.getElementById('on-off-switch');

    this.switch.addEventListener('click', () => {
      const classList = this.purchasedLottoList.classList;

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
