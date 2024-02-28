import './PurchaseInfo.css';
import './LottoNumbers.js';

const PURCHASE_INFO = `
<div class="purchase-info-title-container">
</div>
<div class="purchase-info-container">
</div>
`;

const PURCHASE_INFO_TITLE = (count) => `
<p class="lotto-body">총 ${count}개를 구매했습니다.</p>
`;

class PurchaseInfo extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = PURCHASE_INFO;
    const app = document.querySelector('lotto-app');
    const lottos = app.controller().getLottoGameInfo().lottoNumbersArray;

    const purchasedInfoTitle = this.querySelector('.purchase-info-title-container');
    purchasedInfoTitle.innerHTML = PURCHASE_INFO_TITLE(lottos.length);
    this.#renderPurchaseInfoContainer(lottos);
  }

  // #numbersToLottos(lottoNumbersArray) {
  //   const numbers = lottoNumbersArray.split(',');
  //   const lottos = [];

  //   for (let i = 0; i < numbers.length; i += 6) {
  //     lottos.push(numbers.slice(i, i + 6));
  //   }
  //   return lottos;
  // }

  #renderPurchaseInfoContainer(lottos) {
    const purchasedInfoContainer = this.querySelector('.purchase-info-container');
    let innerHTML = ``;
    lottos.forEach((lottoNumbers) => {
      innerHTML += `<lotto-numbers numbers=${lottoNumbers}></lotto-numbers>`;
    });
    purchasedInfoContainer.innerHTML = innerHTML;
  }
}

customElements.define('purchase-info', PurchaseInfo);
