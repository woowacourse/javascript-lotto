import './LottoMain.css';
import './PurchasePriceForm.js';

const LOTTO_MAIN_CONTAINER = `
  <div class="lotto-main-container">
    <div class="title-container">
      <h1 class="lotto-title">
        🎱 내 번호 당첨 확인 🎱
      </h1>
    </div>
    <purchase-price-form></purchase-price-form>
  </div>
`;

class LottoMain extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LOTTO_MAIN_CONTAINER;
  }
}

customElements.define('lotto-main', LottoMain);
