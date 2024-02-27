import './LottoMain.css';
import './PurchasePriceForm.js';
import './PurchasedInfo.js';
import './WinningAndBonusInputForm.js';
import './LottoButton.js';

const LOTTO_MAIN_CONTAINER = `
  <div class="lotto-main-container">
    <div class="title-container">
      <h1 class="lotto-title">
        🎱 내 번호 당첨 확인 🎱
      </h1>
    </div>
    <purchase-price-form></purchase-price-form>
    <div class="purchase-result"></div>
  </div>
`;

const LOTTO_MAIN_RESULT = (lottoNumbersArray) => `
<purchased-info info={${lottoNumbersArray}}></purchased-info>
<winning-numbers-form></winning-numbers-form>
`;

class LottoMain extends HTMLElement {
  connectedCallback() {
    this.render();
    this.#setPurchaseEventListener();
  }

  render() {
    this.innerHTML = LOTTO_MAIN_CONTAINER;
  }

  #renderResult(event) {
    const { _, lottoNumbersArray } = event.detail;

    const result = document.querySelector('.purchase-result');
    result.innerHTML = LOTTO_MAIN_RESULT(lottoNumbersArray);

    const resultButton = document.querySelector('#result-button');
    resultButton.setText('당첨 결과 확인하기');
    this.#dispatchPurchase(event);
  }

  #dispatchPurchase(event) {
    const purchasedInfo = document.querySelector('purchased-info');
    const purchaseResult = new CustomEvent('purchase-result', {
      detail: { ...event.detail },
    });

    purchasedInfo.dispatchEvent(purchaseResult);
  }

  #setPurchaseEventListener() {
    const purchasePriceForm = document.querySelector('purchase-price-form');
    purchasePriceForm.addEventListener('purchase', (event) => {
      this.#renderResult(event);
    });
  }
}

customElements.define('lotto-main', LottoMain);
