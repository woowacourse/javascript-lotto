import { $, $$ } from './utils/dom.js';

export default class LottoView {
  constructor() {
    this.purchasedLottos = $('#purchased-lottos');
  }

  init() {
    this.hide(this.purchasedLottos);
  }

  show(element) {
    element.style.display = 'block';
  }

  hide(element) {
    element.style.display = 'none';
  }

  showLottoView() {
    this.show(this.purchasedLottos);
  }

  showLottoDetailView() {
    Array.from($$('.lotto-detail')).forEach(lottoDetail => {
      lottoDetail.style.display = 'inline';
    });
  }

  hideLottoDetailView() {
    Array.from($$('.lotto-detail')).forEach(lottoDetail => {
      lottoDetail.style.display = 'none';
    });
  }

  renderTotalLottoCount(count) {
    $('#total-purchased').innerText = count;
  }

  renderLottoIcons(lottos) {
    $('#lotto-icons').innerHTML = this.createLottoIconTemplate(lottos);
    this.hideLottoDetailView();
  }

  createLottoIconTemplate(lottos) {
    return lottos
      .map(
        lotto => `
          <li class="mx-1 text-4xl lotto-wrapper">
            <span class="lotto-icon">🎟️ </span>
            <span class="lotto-detail">${lotto.numberDetail}</span>
          </li>
        `
      )
      .join('');
  }
}
