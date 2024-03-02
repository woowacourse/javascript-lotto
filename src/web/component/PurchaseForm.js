import { $ } from '../util/domSelector';
import ErrorMessageUtil from '../util/ErrorMessageUtil';
import Validator from '../../validator/Validator';

class PurchaseForm extends HTMLElement {
  #boundMethods;
  #elements;

  constructor() {
    super();
    this.#boundMethods = {
      handleSubmit: this.#handleSubmit.bind(this),
      handleEnterKeyDown: this.#handleEnterKeyDown.bind(this),
    };
  }

  connectedCallback() {
    this.#render();
    this.#bindElements();
    this.#setEvent();
  }

  #bindElements() {
    this.#elements = {
      ...this.#elements,
      form: $('#purchase-form', this),
      input: $('#purchase-form-input', this),
      submitButton: $('#purchase-form-button', this),
    };
  }

  #setEvent() {
    this.#elements.submitButton.addEventListener('click', this.#boundMethods.handleSubmit);
    this.#elements.input.addEventListener('keydown', this.#boundMethods.handleEnterKeyDown);
  }

  #handleSubmit() {
    try {
      const purchaseAmount = this.#elements.input.value;
      Validator.validatePurchaseAmount(purchaseAmount);
      ErrorMessageUtil.removeErrorMessage(this.#elements.form);
      this.#purchaseLotto(purchaseAmount);
    } catch (error) {
      ErrorMessageUtil.showErrorMessage(error.message, this.#elements.form);
    }
  }

  #handleEnterKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.#boundMethods.handleSubmit();
    }
  }

  #purchaseLotto(purchaseAmount) {
    this.#elements.input.disabled = true;
    this.#elements.submitButton.disabled = true;
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
