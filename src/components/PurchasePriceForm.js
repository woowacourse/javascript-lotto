import './PurchasePriceForm.css';
import './LottoInputField.js';
import './LottoButton.js';

const PURCHASE_PRICE_FORM = `
  <div class="input-container">
    <div class="label-container">
      <p class="lotto-body">구입할 금액을 입력해 주세요.</p>
    </div>
    <lotto-input-field></lotto-input-field>
  </div>
  <lotto-button>구입</lotto-button>
`;

class PurchasePriceForm extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = PURCHASE_PRICE_FORM;
  }
}

customElements.define('purchase-price-form', PurchasePriceForm);
