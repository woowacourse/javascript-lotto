import './PurchasePriceForm.css';
import './PriceInputField.js';
import './LottoButton.js';

const PURCHASE_PRICE_FORM = `
  <div class="price-input-container">
    <div class="price-input-label-container">
      <p class="lotto-body">구입할 금액을 입력해 주세요.</p>
    </div>
    <price-input-field></price-input-field>
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
