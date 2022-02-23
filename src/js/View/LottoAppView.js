import View from '../core/View.js';
import template from '../templates/template.js';

import { $ } from '../utils/utils.js';
import { validator } from '../utils/validator.js';
import { SELECTOR } from '../utils/contants.js';

export default class LottoAppView extends View {
  template() {
    const { lottoList, isShowNumber } = this.state;

    return template.app({ lottoList, isShowNumber });
  }

  afterMounted() {
    this.$paymentInput = $(SELECTOR.PAYMENT_INPUT);
  }

  bindOnClickPaymentSubmit(callback) {
    this.bindEventListener('click', SELECTOR.PAYMENT_SUBMIT, () => {
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
    this.bindEventListener('click', SELECTOR.SLIDER, () => {
      const { isShowNumber } = this.state;
      this.update({ isShowNumber: !isShowNumber });
    });
  }
}
