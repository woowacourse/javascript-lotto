import template from '../../templates/template.js';
import { SELECTOR } from '../../configs/contants.js';
import { $ } from '../../utils/utils.js';

export default class PaymentView {
  constructor(target) {
    this.target = target;
  }

  render() {
    this.mountTemaplate();
    this.afterMounted();
  }

  mountTemaplate() {
    this.$target = $(this.target);
    this.$target.innerHTML = template.paymentSection();
  }

  afterMounted() {
    this.$paymentInput = $(SELECTOR.PAYMENT_INPUT);
    this.$paymentSubmit = $(SELECTOR.PAYMENT_SUBMIT);
  }

  clearInput() {
    this.$paymentInput.value = '';
    this.$paymentInput.focus();
  }

  bindOnClickPaymentSubmit(callback) {
    this.$paymentSubmit.addEventListener('click', (event) => {
      event.preventDefault();
      callback(this.$paymentInput.valueAsNumber);
    });
  }
}
