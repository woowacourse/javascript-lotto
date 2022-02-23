import { $ } from '../utils/utils.js';
import { validator } from '../utils/validator.js';

export default class View {
  constructor() {
    this.init();
  }

  init() {
    this.cacheDOMElements();
    console.log('view loaded...');
  }

  cacheDOMElements() {
    this.$paymentInput = $('#payment-input');
    this.$paymentSubmit = $('#payment-submit');
  }

  bindOnClickPaymentSubmit(callback) {
    this.$paymentSubmit.addEventListener('click', (event) => {
      event.preventDefault();

      const amount = this.$paymentInput.valueAsNumber;

      try {
        validator.checkChargeAmount(amount);

        callback(amount);
      } catch (e) {
        alert(e);
      }
    });
  }

  render(message) {
    console.log(message);
  }
}
