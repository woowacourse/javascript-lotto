import {
  getLottoDetailTemplate,
  LOTTO_IMAGE_TEMPLATE,
  PURCHASED_LOTTO_TEMPLATE,
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
    this.purchasedLottoListOff = document.getElementById(
      'purchased-lotto-list-off',
    );
    this.purchasedLottoListOn = document.getElementById(
      'purchased-lotto-list-on',
    );
    this.toggle = document.getElementById('purchased-lotto-number-switch');

    this.purchasedLottoCount.textContent = lottoCount;

    this.purchasedLottoListOff.insertAdjacentHTML(
      'afterbegin',
      LOTTO_IMAGE_TEMPLATE.repeat(lottoCount),
    );

    const lottoList = lottos
      .map(lotto => {
        return getLottoDetailTemplate(lotto.getList());
      })
      .join('');

    this.purchasedLottoListOn.insertAdjacentHTML('beforeend', lottoList);

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
