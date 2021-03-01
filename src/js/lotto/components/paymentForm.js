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
    this.$input.addEventListener('input', this.limitPayment);
    this.$form.addEventListener('submit', this.onSubmit.bind(this));
  }

  limitPayment({ target }) {
    const payment = Number(target.value);

    if (payment > MAX_PAYMENT) {
      target.value = `${Math.floor(payment / 10)}`;
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const money = Number(this.$input.value);
    const alertMessage = checkValidPayment(money);

    if (alertMessage) {
      alert(alertMessage);
      this.$input.value = '';

      return;
    }

    this.props.handleInsertion(money);
    disable(this.$input, this.$button);
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <form class="mt-5" id="payment-form" novalidate>
        <label for="payment-input" class="mb-2 d-inline-block">구입할 금액을 입력해주세요. (제한 금액: 100,000)</label>
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
