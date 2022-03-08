import View from '../core/View.js';
import { DOM_STRING, PAYMENT, LOTTO } from '../configs/contants.js';
import { $ } from '../utils/utils.js';
import { validate, purchaseAmountValidator } from '../utils/validator.js';

export default class PaymentSectionView extends View {
  template() {
    return `
      <form id="${DOM_STRING.PAYMENT_FORM}" class="${DOM_STRING.INPUT_FORM}">
        <label
          class="${DOM_STRING.HINT}"
          for="${DOM_STRING.PAYMENT_INPUT}"
        >
          구입할 금액을 입력해주세요.
        </label>
        <input
          id="${DOM_STRING.PAYMENT_INPUT}"
          class="${DOM_STRING.STYLED_INPUT}"
          type="number"
          placeholder="${PAYMENT.PURCHASE_AMOUNT.MIN}"
          min="${PAYMENT.PURCHASE_AMOUNT.MIN}"
          max="${PAYMENT.PURCHASE_AMOUNT.MAX}"
          step="${LOTTO.PRICE}"
          autofocus
        >
        <button
          id="${DOM_STRING.PAYMENT_SUBMIT}"
          class="${DOM_STRING.SUBMIT_BUTTON}"
          type="submit"
          form="${DOM_STRING.PAYMENT_FORM}"
        >구입</button>
      </form>
    `;
  }

  bindOnSubmitPaymentSubmit(callback) {
    this.bindEventListener(
      'submit',
      {
        attributeName: DOM_STRING.PAYMENT_FORM,
        attributeType: 'id',
      },
      () => {
        try {
          const purchaseAmount = this.getPurchaseAmount();

          validate(purchaseAmount, purchaseAmountValidator);
          callback(purchaseAmount);
        } catch (e) {
          alert(e);
        }
      }
    );
  }

  getPurchaseAmount() {
    return $(DOM_STRING.PAYMENT_INPUT, 'id').valueAsNumber;
  }
}
