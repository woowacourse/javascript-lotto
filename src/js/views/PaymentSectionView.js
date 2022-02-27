import View from '../core/View.js';
import { SELECTOR, DOM_STRING } from '../configs/contants.js';
import { $ } from '../utils/utils.js';
import { validator } from '../utils/validator.js';

export default class PaymentSectionView extends View {
  template() {
    return `
      <label>구입할 금액을 입력해주세요.</label>
      <form>
        <input type="number" id="${DOM_STRING.PAYMENT_INPUT}">
        <button id="${DOM_STRING.PAYMENT_SUBMIT}">구입</button>
      </form>
    `;
  }

  bindOnClickPaymentSubmit(callback) {
    this.bindEventListener('click', SELECTOR.PAYMENT_SUBMIT, () => {
      const amount = $(SELECTOR.PAYMENT_INPUT).valueAsNumber;

      try {
        validator.checkPurchaseAmount(amount);
        callback(amount);
      } catch (e) {
        alert(e);
      }
    });
  }
}
