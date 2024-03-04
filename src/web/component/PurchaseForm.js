import { $ } from '../util/domSelector';
import ErrorMessageUtil from '../util/ErrorMessageUtil';
import numericInputFilter from '../util/numericInputFilter';
import Validator from '../../validator/Validator';
import { SETTING } from '../../constant/setting';

class PurchaseForm extends HTMLElement {
  #elements;

  connectedCallback() {
    this.#render();
    this.#bindElements();
    this.#setEvent();
    this.#setInputFocus();
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
    this.#elements.submitButton.addEventListener('click', this.#handleSubmit.bind(this));
    this.#elements.input.addEventListener('input', () =>
      numericInputFilter(this.#elements.input, SETTING.MAX_LOTTO_PURCHASE_AMOUNT_LENGTH),
    );
    this.#elements.input.addEventListener('keydown', this.#handleEnterKeyDown.bind(this));
  }

  #setInputFocus() {
    this.#elements.input.focus();
  }

  #handleSubmit() {
    try {
      const purchaseAmount = this.#elements.input.value;
      Validator.validatePurchaseAmount(purchaseAmount);
      ErrorMessageUtil.removeErrorMessage(this.#elements.form);
      this.#purchaseLotto(parseInt(purchaseAmount, 10));
    } catch (error) {
      ErrorMessageUtil.showErrorMessage(error.message, this.#elements.form);
    }
  }

  #handleEnterKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.#handleSubmit();
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
          <input id="purchase-form-input" type="number" placeholder="금액">
          <button type="button" id="purchase-form-button">구입</button>
        </form>
      </section>
    `;
  }
}

customElements.define('purchase-form', PurchaseForm);
