export const PAYMENT_FORM_EVENTS = {
  submit: 'paymentFormSubmit',
};

export const PAYEMENT_FORM_SELECTOR = "form[is='payment-form']";

export default class PaymentForm extends HTMLFormElement {
  #errorMessage;

  constructor() {
    super();

    const template = document.getElementById('template-payment-form');
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.#errorMessage = this.querySelector('.err-msg');
  }

  connectedCallback() {
    this.addEventListener('submit', this.#handleSubmit.bind(this));
  }

  displayErrorMessage(message) {
    this.#errorMessage.innerHTML = message;
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
