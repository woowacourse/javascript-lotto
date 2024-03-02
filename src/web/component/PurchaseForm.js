import { $ } from '../../util/domSelector';
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
      this.#removeErrorMessage(this);
      this.#purchaseLotto(purchaseAmount);
    } catch (error) {
      this.#showErrorMessage(error.message, this);
    }
  }

  #purchaseLotto(purchaseAmount) {
    this.dispatchEvent(new CustomEvent('purchaseLotto', { detail: { purchaseAmount } }));
  }

  #showErrorMessage(message, target) {
    const errorMessageElement = $('.error-text', target);
    if (errorMessageElement) {
      errorMessageElement.textContent = message;
      return;
    }
    const messageElement = `<p class='error-text'>${message}</p>`;
    this.lastElementChild.insertAdjacentHTML('beforeend', messageElement);
  }

  #removeErrorMessage(target) {
    const errorMessageElement = $('.error-text', target);
    errorMessageElement?.remove();
  }

  #render() {
    this.innerHTML = `
      <section id="purchase">
        <p>구입할 금액을 입력해주세요.</p>
        <form id="purchase-form">
          <input id="purchase-form-input" placeholder="금액">
          <button type="button" id="purchase-form-button">구입</button>
        </form>
      </section>
    `;
  }
}

customElements.define('purchase-form', PurchaseForm);
