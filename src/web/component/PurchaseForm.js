import { $ } from '../util/domSelector';
import ErrorMessageUtil from '../util/ErrorMessageUtil';
import Validator from '../../validator/Validator';

class PurchaseForm extends HTMLElement {
  #boundMethods;

  constructor() {
    super();
    this.#boundMethods = {
      handleSubmit: this.#handleSubmit.bind(this),
    };
  }

  connectedCallback() {
    this.#render();
    this.#setEvent();
  }

  #setEvent() {
    $('#purchase-form-button').addEventListener('click', this.#boundMethods.handleSubmit);
  }

  #handleSubmit() {
    try {
      const purchaseAmount = $('#purchase-form-input').value;
      Validator.validatePurchaseAmount(purchaseAmount);
      ErrorMessageUtil.removeErrorMessage($('#purchase-form', this));
      this.#purchaseLotto(purchaseAmount);
    } catch (error) {
      ErrorMessageUtil.showErrorMessage(error.message, $('#purchase-form', this));
    }
  }

  #purchaseLotto(purchaseAmount) {
    this.dispatchEvent(new CustomEvent('purchaseLotto', { detail: { purchaseAmount } }));
  }

  #render() {
    this.innerHTML = `
      <section id="purchase">
        <p>구입할 금액을 입력해주세요.</p>
        <form id="purchase-form">
          <input id="purchase-form-input" type="number" placeholder="금액" oninput="this.value = this.valueAsNumber">
          <button type="button" id="purchase-form-button">구입</button>
        </form>
      </section>
    `;
  }
}

customElements.define('purchase-form', PurchaseForm);
