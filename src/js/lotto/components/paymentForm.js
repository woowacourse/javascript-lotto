import { Component } from '../../shared/models/index.js';
import { $, disable } from '../../shared/utils/DOM.js';
import { MAX_PAYMENT } from '../utils/constants.js';
import { checkValidPayment } from '../utils/validate.js';

export default class PaymentForm extends Component {
  initDOM() {
    this.$form = $('#payment-form');
    this.$input = $('#payment-input');
    this.$button = $('#payment-submit');
  }

  initEvent() {
    this.$input.addEventListener('input', this.limitLength);
    this.$form.addEventListener('submit', this.onSubmit.bind(this));
  }

  limitLength({ target }) {
    const maxLength = String(MAX_PAYMENT).length;
    if (target.value.length > maxLength) {
      target.value = target.value.slice(0, maxLength);
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const money = Number(this.$input.value);
    const alertMessage = checkValidPayment(money);

    if (alertMessage) {
      alert(alertMessage);

      return;
    }

    this.props.handleInsertion(money);
    disable(this.$input, this.$button);
    $(`[data-lotto-number='0']`).focus();
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <form class="mt-5" id="payment-form" novalidate>
        <label for="payment-input" class="mb-2 d-inline-block">구입할 금액을 입력해주세요.</label>
        <div class="d-flex">
          <input
            type="number"
            id="payment-input"
            class="w-100 mr-2 pl-2"
            placeholder="구입 금액 (1000원 단위)"
            autofocus
          />
          <button type="submit" class="btn btn-cyan" id="payment-submit">확인</button>
        </div>
      </form>`;
  }
}
