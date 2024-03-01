import './PurchasePriceForm.css';
import './PriceInputField.js';
import './LottoButton.js';
import { BuyLottoPriceValidator } from '../validator/index.js';

const PURCHASE_PRICE_FORM = `
  <main class="lotto-body">구입할 금액을 입력해 주세요.</main>
  <section class="price-input-button-container">
    <price-input-field></price-input-field>
    <lotto-button id="purchase-button"></lotto-button>
  </section>
  <p class ="error-message"></p>
`;

class PurchasePriceForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.#setEventListener();
  }

  render() {
    this.innerHTML = PURCHASE_PRICE_FORM;
    const purchaseButton = this.querySelector('#purchase-button');
    purchaseButton.setText('구입');
  }

  #setEventListener() {
    this.#setInputListener();
    this.#setEnterListener();
    this.#setClickListener();
  }

  #setInputListener() {
    const priceInputField = this.querySelector('price-input-field');
    priceInputField.addEventListener('input', () => {
      const button = this.querySelector('#purchase-button');
      button.setIsDisabled(priceInputField.getValue() === '');
    });
  }

  #setEnterListener() {
    const priceInputField = this.querySelector('price-input-field');
    priceInputField.addEventListener('keyup', (event) => {
      const button = this.querySelector('#purchase-button');
      if (event.key === 'Enter' && !button.getIsDisabled()) {
        this.#handlePurchase();
      }
    });
  }

  #handlePurchase() {
    const price = this.querySelector('price-input-field').getValue();
    this.#errorHandler(price);
  }

  #setClickListener() {
    const button = this.querySelector('#purchase-button');
    button.addEventListener('click', () => {
      this.#handlePurchase();
    });
  }

  #errorHandler(price) {
    try {
      BuyLottoPriceValidator.check(price);

      this.#purchaseEvent(Number(price));
      this.connectedCallback();
    } catch (error) {
      this.setErrorMessage(error);
    }
  }

  setErrorMessage(error) {
    this.querySelector('.error-message').textContent = error.message;
  }

  #purchaseEvent(price) {
    const app = document.querySelector('lotto-app');
    app.controller().processBuyLotto(price);

    const purchaseEvent = new CustomEvent('purchase', {});
    this.dispatchEvent(purchaseEvent);
  }
}

customElements.define('purchase-price-form', PurchasePriceForm);
