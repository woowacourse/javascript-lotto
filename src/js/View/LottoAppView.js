import View from '../core/View.js';
import { $ } from '../utils/utils.js';
import { validator } from '../utils/validator.js';
import template from '../templates/template.js';

export default class LottoAppView extends View {
  template() {
    const { lottoList, isShowNumber } = this.state;

    return template.app({ lottoList, isShowNumber });
  }

  afterMounted() {
    this.$paymentInput = $('#payment-input');
    this.$paymentSubmit = $('#payment-submit');
  }

  bindOnClickPaymentSubmit(callback) {
    this.bindEventListener('click', '#payment-submit', () => {
      const amount = this.$paymentInput.valueAsNumber;

      try {
        validator.checkChargeAmount(amount);
        callback(amount);
      } catch (e) {
        alert(e);
      }
    });
  }

  bindOnClickNumberToggle() {
    this.bindEventListener('click', '#slider', () => {
      const { isShowNumber } = this.state;
      this.update({ isShowNumber: !isShowNumber });
    });
  }
}
