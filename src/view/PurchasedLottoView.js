import { resetElement } from '../utils/dom';

class PurchasedLottoView {
  constructor() {
    this.purchasedLottoSection = document.getElementById('purchased-lotto-section');
  }

  render(lottos, money) {
    this.purchasedLottoSection.insertAdjacentHTML(
      'afterbegin',
      `<p class="lotto-body">총 ${money / 1000}개를 구매하였습니다.</p>`,
    );
    this.purchasedLottoSection.insertAdjacentHTML(
      'beforeend',
      `${lottos
        .map((lotto) => `<p class="lotto-body">🎟️ ${lotto.getLottoNumbers().join(', ')}</p>`)
        .join('')}`,
    );
  }

  reset() {
    resetElement(this.purchasedLottoSection);
  }
}

export default PurchasedLottoView;
