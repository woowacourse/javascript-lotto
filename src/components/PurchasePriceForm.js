import './PurchasePriceForm.css';
import './PriceInputField.js';
import './LottoButton.js';
import { BuyLottoPriceValidator } from '../validator/index.js';

const PURCHASE_PRICE_FORM = `
  <div class="price-input-container">
    <div class="price-input-label-container">
      <p class="lotto-body">구입할 금액을 입력해 주세요.</p>
    </div>
    <price-input-field></price-input-field>
  </div>
  <lotto-button id="purchase-button"></lotto-button>
`;

class PurchasePriceForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.#setEventListener();
  }

  render() {
    this.innerHTML = PURCHASE_PRICE_FORM;
    const purchaseButton = document.querySelector('#purchase-button');
    purchaseButton.setText('구입');
  }

  #setEventListener() {
    const purchaseButton = document.querySelector('#purchase-button');

    purchaseButton.addEventListener('click', () => {
      const price = document.querySelector('price-input-field').getValue();
      BuyLottoPriceValidator.check(price);

      this.#purchaseEvent(price);
    });
  }

  #purchaseEvent(price) {
    const app = document.querySelector('lotto-app');
    const { _, lottoNumbersArray } = app.controller().processBuyLotto(price);

    const purchaseEvent = new CustomEvent('purchase', { detail: { price, lottoNumbersArray } });
    this.dispatchEvent(purchaseEvent);
  }
}

customElements.define('purchase-price-form', PurchasePriceForm);
