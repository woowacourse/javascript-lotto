import View from '../core/View.js';
import { DOM_STRING, PAYMENT, LOTTO } from '../configs/contants.js';
import { $ } from '../utils/utils.js';
import { validator } from '../utils/validator.js';

export default class PaymentSectionView extends View {
  template() {
    return `
      <label>구입할 금액을 입력해주세요.</label>
      <form>
        <input
          id="${DOM_STRING.PAYMENT_INPUT}"
          type="number"
          placeholder="${PAYMENT.PURCHASE_AMOUNT.MIN}"
          min="${PAYMENT.PURCHASE_AMOUNT.MIN}"
          max="${PAYMENT.PURCHASE_AMOUNT.MAX}"
          step="${LOTTO.PRICE}"
          autofocus
        >
        <button id="${DOM_STRING.PAYMENT_SUBMIT}">구입</button>
      </form>
    `;
  }

  bindOnClickPaymentSubmit(callback) {
    this.bindEventListener(
      'click',
      { attributeName: DOM_STRING.PAYMENT_SUBMIT, attributeType: 'id' },
      () => {
        const amount = $(DOM_STRING.PAYMENT_INPUT, 'id').valueAsNumber;

        try {
          validator.checkPurchaseAmount(amount);
          callback(amount);
        } catch (e) {
          alert(e);
        }
      }
    );
  }
}
