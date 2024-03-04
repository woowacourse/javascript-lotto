import './LottoMain.css';
import './PurchasePriceForm.js';
import './PurchaseInfo.js';
import './WinningAndBonusForm.js';
import './LottoButton.js';

const LOTTO_MAIN = `
  <section class="lotto-main-container">
    <h1 class="lotto-title">
        🎱 내 번호 당첨 확인 🎱
    </h1>
    
    <purchase-price-form></purchase-price-form>
    <section class="purchase-result"></section>
  </section>
`;

const LOTTO_MAIN_RESULT = `
<purchase-info></purchase-info>
<winning-and-bonus-form></winning-and-bonus-form>
`;

class LottoMain extends HTMLElement {
  connectedCallback() {
    this.render();
    this.#setPurchaseEventListener();
  }

  render() {
    this.innerHTML = LOTTO_MAIN;
  }

  #setPurchaseEventListener() {
    const purchasePriceForm = this.querySelector('purchase-price-form');
    purchasePriceForm.addEventListener('purchase', () => {
      this.#renderResult();
    });
  }

  #renderResult() {
    const purchaseResult = this.querySelector('.purchase-result');
    purchaseResult.innerHTML = LOTTO_MAIN_RESULT;

    const resultButton = this.querySelector('#result-button');
    resultButton.setText('당첨 결과 확인하기');
  }
}

customElements.define('lotto-main', LottoMain);
