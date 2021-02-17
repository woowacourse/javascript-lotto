import Component from '../lib/core/Component.js';
import { $ } from '../lib/utils/dom.js';
import { createTicket } from '../lib/utils/ticket.js';

class PaymentInput extends Component {
  mountTemplate() {
    this.$target.innerHTML = `
        <label class="mb-2 d-inline-block">
          구입할 금액을 입력해주세요.
        </label>
        <div class="d-flex">
          <input
            id="payment-input"
            type="number"
            class="w-100 mr-2 pl-2"
            placeholder="구입 금액"
          />
          <button id="payment-submit" type="submit" class="btn btn-cyan">확인</button>
        </div>
    `;
  }

  initEvent() {
    this.$target.addEventListener('submit', event => {
      event.preventDefault();

      if (event.target.id === 'payment-input-wrapper') {
        const { value } = $('#payment-input');
        if (!this.isValid(value)) {
          this.alertByCase(value);
          return;
        }
        const numberOfTickets = Math.floor(Number(value) / 1000);
        this.props.tickets.set(
          [...Array(numberOfTickets)].map(() => createTicket())
        );
      }
    });
  }

  isValid(value) {
    return value.length;
  }

  alertByCase(value) {
    if (!value.length) {
      alert('공백은 입력할 수 없습니다. 숫자를 입력해 주세요.');
    }
  }
}

export default PaymentInput;
