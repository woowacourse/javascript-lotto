export const PAYMENT_FORM_EVENTS = {
  submit: 'paymentFormSubmit',
};

export const PAYEMENT_FORM_SELECTOR = "form[is='payment-form']";

export default class PaymentForm extends HTMLFormElement {
  #errorMessage;

  #input;

  #submitBtn;

  constructor() {
    super();

    const template = document.getElementById('template-payment-form');
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.#errorMessage = this.querySelector('.err-msg');
    this.#input = this.paymentAmount;
    this.#submitBtn = this.querySelector('button');
  }

  connectedCallback() {
    this.addEventListener('submit', this.#handleSubmit.bind(this));
  }

  clear() {
    this.#input.disabled = false;
    this.#submitBtn.disabled = false;
    this.reset();
  }

  displayErrorMessage(message) {
    this.#errorMessage.innerHTML = message;
  }

  clearErrorMessage() {
    this.#errorMessage.innerHTML = '';
  }

  disableForm() {
    this.#input.disabled = true;
    this.#submitBtn.disabled = true;
  }

  #handleSubmit(e) {
    e.preventDefault();

    const paymentAmount = new FormData(this).get('paymentAmount');
    this.dispatchEvent(
      new CustomEvent(PAYMENT_FORM_EVENTS.submit, {
        detail: { paymentAmount },
      }),
    );
  }
}
