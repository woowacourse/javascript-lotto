import { PURCHASED_LOTTO_TEMPLATE, getLottoListTemplate } from './template.js';

export default class PurchasedLottoView {
  constructor() {
    this.container = document.getElementById('purchased-lotto-container');
  }

  render(lottos, lottoCount) {
    this.container.insertAdjacentHTML('beforeend', PURCHASED_LOTTO_TEMPLATE);

    const purchasedLottoCount = document.getElementById(
      'purchased-lotto-count',
    );
    purchasedLottoCount.textContent = lottoCount;

    this.renderPurchasedLottoList(lottos);
    this.addSwitchClickEvent();
  }

  renderPurchasedLottoList(lottos) {
    this.purchasedLottoList = document.getElementById('purchased-lotto-list');
    this.purchasedLottoList.insertAdjacentHTML(
      'beforeend',
      getLottoListTemplate(lottos),
    );
  }

  addSwitchClickEvent() {
    const switchButton = document.getElementById('on-off-switch');
    switchButton.addEventListener('click', this.switchClickHandler.bind(this));
  }

  switchClickHandler() {
    const classList = this.purchasedLottoList.classList;

    classList.contains('switch-off')
      ? classList.replace('switch-off', 'switch-on')
      : classList.replace('switch-on', 'switch-off');
  }

  resetScreen() {
    this.container.removeChild(this.container.lastElementChild);
  }
}
