export const EVENTS = {
  paymentFormSubmit: 'paymentFormSubmit',
};

export const SELECTOR = "form[is='payment-form']";

export default class PaymentForm extends HTMLFormElement {
  constructor() {
    super();

    const template = document.getElementById('payment-form');
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.addEventListener('submit', this.#handleSubmit.bind(this));
  }

  // validator를 여기서 실행시켜줘야 하나?
  #handleSubmit(e) {
    e.preventDefault();

    const paymentAmount = new FormData(this).get('paymentAmount');
    this.dispatchEvent(
      new CustomEvent(EVENTS.paymentFormSubmit, {
        detail: { paymentAmount },
      }),
    );
  }
}
