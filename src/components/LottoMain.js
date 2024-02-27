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
    <purchased-info></purchased-info>
    <winning-numbers-form></winning-numbers-form>
    <lotto-button id="result-button"></lotto-button>
  </div>
`;

class LottoMain extends HTMLElement {
  connectedCallback() {
    this.render();
    this.#setPurchaseEventListener();
  }

  render() {
    this.innerHTML = LOTTO_MAIN_CONTAINER;
    const resultButton = document.querySelector('#result-button');
    resultButton.setText('당첨 결과 확인하기');
  }

  #setPurchaseEventListener() {
    const app = document.querySelector('lotto-app');
    const purchasePriceForm = document.querySelector('purchase-price-form');
    purchasePriceForm.addEventListener('purchase', (event) => {
      const { price } = event.detail;
      app.controller().processBuyLotto(price);
    });
  }
}

customElements.define('lotto-main', LottoMain);
