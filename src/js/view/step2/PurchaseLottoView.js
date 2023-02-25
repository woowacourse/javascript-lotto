const LOTTO_IMAGE = `<span class="purchase-lotto-image">🎟️</span>`;

const getTemplate = (count, lottoListTemplate) => `
  <div id="purchase-lotto-box">
    <div id="purchase-lotto-item-message">총 ${count}개를 구매하였습니다.</div>
    ${lottoListTemplate}
  </div>
`;

const getLottoItemTemplate = lotto => `
  <div class="purchase-lotto-item">
    ${LOTTO_IMAGE}
    <div class="purchase-lotto-number">${lotto.join(', ')}</div>
  </div>
`;

const getLottoListTemplate = lottos =>
  lottos.reduce((result, lotto) => result + getLottoItemTemplate(lotto.lottoNum), '');

class PurchaseLottoView {
  constructor() {
    this.container = document.getElementById('purchase-lotto-container');
  }

  render(lottos) {
    this.reset();
    this.container.insertAdjacentHTML('beforeend', getTemplate(lottos.length, getLottoListTemplate(lottos)));
  }

  reset() {
    this.container.replaceChildren();
  }
}

export default PurchaseLottoView;
