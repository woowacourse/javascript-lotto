import Component from '../lib/core/Component.js';
import { createTicket, getNumberOfTickets } from '../lib/utils/ticket.js';
import {
  HAS_A_WHITESPACE_MESSAGE,
  LESS_THAN_TICKET_PRICE_MESSAGE,
} from '../lib/constants/alertMessage.js';
import { TICKET_PRICE } from '../lib/constants/ticket.js';

class PaymentForm extends Component {
  mountTemplate() {
    this.$target.innerHTML = `
        <label class="mb-2 d-inline-block">
          구입할 금액을 입력해주세요.
        </label>
        <div class="d-flex">
          <input
            id="payment-input"
            type="number"
            name="money-amount"
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
      if (event.target.id !== 'payment-form-wrapper') return;

      const { value } = event.target.elements['money-amount'];
      if (!this.isValid(value)) {
        this.alertByCase(value);
        return;
      }

      const numberOfTickets = getNumberOfTickets(value);
      this.props.tickets.set(
        [...Array(numberOfTickets)].map(() => createTicket())
      );
    });
  }

  isValid(value) {
    return value.length && Number(value) >= TICKET_PRICE;
  }

  alertByCase(value) {
    if (!value.length) {
      alert(HAS_A_WHITESPACE_MESSAGE);
      return;
    }

    if (Number(value) < TICKET_PRICE) {
      alert(LESS_THAN_TICKET_PRICE_MESSAGE);
    }
  }
}

export default PaymentForm;
